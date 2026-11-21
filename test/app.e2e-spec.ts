import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { DataSource, DeepPartial } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { User } from '../src/modules/users/entities/user.entity';
import { Species } from '../src/modules/species/entities/species.entity';
import { Breed } from '../src/modules/breeds/entities/breed.entity';
import { Specialty } from '../src/modules/specialties/entities/specialty.entity';
import { Veterinarian } from '../src/modules/veterinarians/entities/veterinarian.entity';
import { Owner } from '../src/modules/owners/entities/owner.entity';
import { Pet } from '../src/modules/pets/entities/pet.entity';
import { AppointmentStatus } from '../src/modules/appointment_statuses/entities/appointment_status.entity';

describe('Appointments & RBAC Lifecycle (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let adminToken: string;
  let ownerToken: string;

  // Test fixture IDs
  let createdAppointmentId: string;
  let testVetId: string;
  let testPetId: string;
  let scheduledStatusId: string;
  const testDate = '2026-12-15T10:00:00.000Z';
  const rescheduledDate = '2026-12-15T11:00:00.000Z';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    dataSource = app.get(DataSource);

    // 1. Login as seeded Admin
    const adminLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@vetclinic.com', password: 'Admin@123' });
    expect([200, 201]).toContain(adminLogin.status);
    adminToken = adminLogin.body.access_token;

    // 2. Ensure a test OWNER user exists and log in
    const userRepo = dataSource.getRepository(User);
    const ownerEmail = 'e2e-owner@vetclinic.com';
    let ownerUser = await userRepo.findOneBy({ email: ownerEmail });
    if (!ownerUser) {
      ownerUser = await userRepo.save(
        userRepo.create({
          email: ownerEmail,
          password_hash: await bcrypt.hash('Owner@123', 10),
          role: 'OWNER' as User['role'],
        }),
      );
    }

    const ownerLogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: ownerEmail, password: 'Owner@123' });
    expect([200, 201]).toContain(ownerLogin.status);
    ownerToken = ownerLogin.body.access_token;

    // 3. Ensure prerequisite records exist (Status, Vet, Pet)
    const statusRepo = dataSource.getRepository(AppointmentStatus);
    const scheduled = await statusRepo.findOneBy({ name: 'Scheduled' });
    scheduledStatusId = scheduled!.appointment_status_id;

    // Create/fetch test Vet
    let vetUser = await userRepo.findOneBy({ email: 'e2e-vet@vetclinic.com' });
    if (!vetUser) {
      vetUser = await userRepo.save(
        userRepo.create({
          email: 'e2e-vet@vetclinic.com',
          password_hash: await bcrypt.hash('Vet@123', 10),
          role: 'VET' as User['role'],
        }),
      );
    }

    const specialtyRepo = dataSource.getRepository(Specialty);
    let specialty = await specialtyRepo.findOneBy({ name: 'General Practice' });
    if (!specialty) {
      specialty = await specialtyRepo.save(
        specialtyRepo.create({ name: 'General Practice' }),
      );
    }

    const vetRepo = dataSource.getRepository(Veterinarian);
    let vet = await vetRepo.findOneBy({ user_id: vetUser.user_id });
    if (!vet) {
      const vetData: DeepPartial<Veterinarian> = {
        user_id: vetUser.user_id,
        specialty_id: specialty.specialty_id,
        first_name: 'Test',
        last_name: 'Vet',
        phone_number: '09171111111',
        license_number: 'E2E-VET-001',
      };
      vet = await vetRepo.save(vetRepo.create(vetData));
    }
    testVetId = vet.vet_id;

    // Create/fetch test Owner profile & Pet
    const ownerRepo = dataSource.getRepository(Owner);
    let ownerProfile = await ownerRepo.findOneBy({ user_id: ownerUser.user_id });
    if (!ownerProfile) {
      const ownerData: DeepPartial<Owner> = {
        user_id: ownerUser.user_id,
        first_name: 'Test',
        last_name: 'Owner',
        phone_number: '09170000000',
      };
      ownerProfile = await ownerRepo.save(ownerRepo.create(ownerData));
    }

    const speciesRepo = dataSource.getRepository(Species);
    const dogSpecies = await speciesRepo.findOneBy({ name: 'Dog' });

    const breedRepo = dataSource.getRepository(Breed);
    let breed = await breedRepo.findOneBy({ name: 'Aspin' });
    if (!breed) {
      const breedData: DeepPartial<Breed> = {
        name: 'Aspin',
        species_id: dogSpecies!.species_id,
      };
      breed = await breedRepo.save(breedRepo.create(breedData));
    }

    const petRepo = dataSource.getRepository(Pet);
    let pet = await petRepo.findOneBy({ name: 'E2E-Bantay' });
    if (!pet) {
      const petData: DeepPartial<Pet> = {
        name: 'E2E-Bantay',
        gender: 'Male', // match your Pet entity's expected string/enum value
        owner_id: ownerProfile.owner_id,
        breed_id: breed.breed_id,
      };
      pet = await petRepo.save(petRepo.create(petData));
    }
    testPetId = pet.pet_id;
  });

  afterAll(async () => {
    await app?.close();
  });

  it('RBAC: POST /species -> returns 403 Forbidden for OWNER role', () => {
    return request(app.getHttpServer())
      .post('/species')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({ name: 'Dinosaur' })
      .expect(403);
  });

  it('Validation: GET /appointments/not-a-uuid -> returns 400 Bad Request (ParseUUIDPipe)', () => {
    return request(app.getHttpServer())
      .get('/appointments/not-a-uuid')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(400);
  });

  it('POST /appointments -> creates an appointment (201)', async () => {
    const res = await request(app.getHttpServer())
      .post('/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        pet_id: testPetId,
        vet_id: testVetId,
        appointment_status_id: scheduledStatusId,
        appointment_date: testDate,
        reason: 'Annual Vaccination',
      })
      .expect(201);

    expect(res.body.appointment_id).toBeDefined();
    createdAppointmentId = res.body.appointment_id;
  });

  it('POST /appointments -> returns 409 Conflict when double-booking same vet & time', () => {
    return request(app.getHttpServer())
      .post('/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        pet_id: testPetId,
        vet_id: testVetId,
        appointment_status_id: scheduledStatusId,
        appointment_date: testDate,
        reason: 'Double-booked visit',
      })
      .expect(409);
  });

  it('GET /appointments/:id -> retrieves appointment with relations (200)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/appointments/${createdAppointmentId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(res.body.appointment_id).toBe(createdAppointmentId);
    expect(res.body.pet).toBeDefined();
    expect(res.body.vet).toBeDefined();
  });

  it('PATCH /appointments/:id -> reschedules appointment without self-conflict (200)', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/appointments/${createdAppointmentId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ appointment_date: rescheduledDate })
      .expect(200);

    expect(new Date(res.body.appointment_date).toISOString()).toBe(rescheduledDate);
  });

  it('DELETE /appointments/:id -> deletes the test appointment (200)', () => {
    return request(app.getHttpServer())
      .delete(`/appointments/${createdAppointmentId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  });
});