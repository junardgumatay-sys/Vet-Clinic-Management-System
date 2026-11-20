import { Injectable } from '@nestjs/common';
import { CreateAppointmentStatusDto } from './dto/create-appointment_status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentStatus } from './entities/appointment_status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentStatusesService {
  constructor(
    @InjectRepository(AppointmentStatus)
    private readonly appoinment_statusesRepo: Repository<AppointmentStatus>,
  ) {}

  create(createAppointmentStatusDto: CreateAppointmentStatusDto) {
    const appoinmentStatus = this.appoinment_statusesRepo.create(createAppointmentStatusDto);
    return this.appoinment_statusesRepo.save(appoinmentStatus);
  }

  findAll() {
    return this.appoinment_statusesRepo.find();
  }
}
