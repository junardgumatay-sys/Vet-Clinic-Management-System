import { Injectable } from '@nestjs/common';
import { CreateAppointmentStatusDto } from './dto/create-appointment_status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentStatus } from './entities/appointment_status.entity';
import { Repository } from 'typeorm';
import { UpdateAppointmentStatusDto } from './dto/update-appointment_status.dto';

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

  async findOne(id: string) {
    const appoinmentStatus = await this.appoinment_statusesRepo.findOne({
      where: { appointment_status_id: id }
    });
    if (!appoinmentStatus) {
      throw new Error('Appointment status not found');
    }
    return appoinmentStatus;
  }

  async update(id: string, updateAppointmentStatusDto: UpdateAppointmentStatusDto) {
    const appoinmentStatus = await this.findOne(id);
    Object.assign(appoinmentStatus, updateAppointmentStatusDto);
    return this.appoinment_statusesRepo.save(appoinmentStatus);
  }

  async remove(id: string) {
    const appoinmentStatus = await this.findOne(id);
    return this.appoinment_statusesRepo.remove(appoinmentStatus);
  }
}
