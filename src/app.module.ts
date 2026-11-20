import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SpeciesModule } from './modules/species/species.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { AppointmentStatusesModule } from './modules/appointment_statuses/appointment_statuses.module';
import { PaymentMethodsModule } from './modules/payment_methods/payment_methods.module';
import { PaymentStatusesModule } from './modules/payment_statuses/payment_statuses.module';
import { MedicinesModule } from './modules/medicines/medicines.module';
import { BreedsModule } from './modules/breeds/breeds.module';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './modules/admins/admins.module';
import { ReceptionistsModule } from './modules/receptionists/receptionists.module';
import { OwnersModule } from './modules/owners/owners.module';
import { VeterinariansModule } from './modules/veterinarians/veterinarians.module';
import { PetsModule } from './modules/pets/pets.module';
import { VacinationsModule } from './modules/vacinations/vacinations.module';
import { PrescriptionDetailsModule } from './modules/prescription_details/prescription_details.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { MedicalRecordsModule } from './modules/medical_records/medical_records.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';
import { PaymentsModule } from './modules/payments/payments.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com,
    // then run `npx @nestjs/observe link` to write your key pair into .env.
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'vet-clinic-management-system',
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true, // Automatically finds your entity files later
        synchronize: true,
      }),
    }),

    SpeciesModule,

    SpecialtiesModule,

    AppointmentStatusesModule,

    PaymentMethodsModule,

    PaymentStatusesModule,

    MedicinesModule,

    BreedsModule,

    UsersModule,

    AdminsModule,

    ReceptionistsModule,

    OwnersModule,

    VeterinariansModule,

    PetsModule,

    VacinationsModule,

    PrescriptionDetailsModule,

    AppointmentsModule,

    MedicalRecordsModule,

    PrescriptionsModule,

    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
