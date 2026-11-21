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
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { RolesGuard } from './auth/guard/roles.guard';
import * as Joi from 'joi';

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
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SSL: Joi.string().valid('true', 'false').default('false'),
        JWT_SECRET: Joi.string().required(),
        FRONTEND_URL: Joi.string().optional(),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') !== 'production',
        ssl:
          config.get<string>('DB_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
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

    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}