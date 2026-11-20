import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepo: Repository<Appointment>
  ){}

  create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = this.appointmentsRepo.create(createAppointmentDto)
    return this.appointmentsRepo.save(appointment);
  }

  findAll() {
    return this.appointmentsRepo.find({
      relations: {
        pet: {
          owner: true,
          breed: true,
        },
        vet: {
          user: true,
          specialty: true,
        },
        appointmentStatus: true,
      }
    });
  }

  async findOne(id: string) {
  const appointment = await this.appointmentsRepo.findOne({
    where: { appointment_id: id },
    relations: {
      pet: true,
      vet: true,
      appointmentStatus: true,
    },
  });

  if (!appointment) {
    throw new NotFoundException(`Appointment with ID "${id}" not found`);
  }

  return appointment;
}

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);
    Object.assign(appointment, updateAppointmentDto);
    return this.appointmentsRepo.save(appointment);
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);
    return this.appointmentsRepo.remove(appointment);
  }
}
