import { Module } from '@nestjs/common';
import { AppointmentStatusesService } from './appointment_statuses.service';
import { AppointmentStatusesController } from './appointment_statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentStatus } from './entities/appointment_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentStatus])],
  controllers: [AppointmentStatusesController],
  providers: [AppointmentStatusesService],
})
export class AppointmentStatusesModule {}
