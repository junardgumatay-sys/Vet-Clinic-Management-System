import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentStatusesService } from './appointment_statuses.service';
import { CreateAppointmentStatusDto } from './dto/create-appointment_status.dto';

@Controller('appointment-statuses')
export class AppointmentStatusesController {
  constructor(private readonly appointmentStatusesService: AppointmentStatusesService) {}

  @Post()
  create(@Body() createAppointmentStatusDto: CreateAppointmentStatusDto) {
    return this.appointmentStatusesService.create(createAppointmentStatusDto);
  }

  @Get()
  findAll() {
    return this.appointmentStatusesService.findAll();
  }
}
