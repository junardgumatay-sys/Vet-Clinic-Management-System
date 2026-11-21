import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Not,Repository } from 'typeorm';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ConflictException } from '@nestjs/common';


@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentsRepo: Repository<Appointment>
  ){}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const conflict = await this.appointmentsRepo.findOne({
      where: {
        vet_id: createAppointmentDto.vet_id,
        appointment_date: new Date(createAppointmentDto.appointment_date),
      },
    });

    if (conflict) {
      throw new ConflictException(
        'This veterinarian already has an appointment scheduled at that time',
      );
    }

    const appointment = this.appointmentsRepo.create(createAppointmentDto);
    return this.appointmentsRepo.save(appointment);
  }

  async findAll(query?: {
    vet_id?: string;
    appointment_status_id?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;

    const [data, total] = await this.appointmentsRepo.findAndCount({
      where: {
        ...(query?.vet_id && { vet_id: query.vet_id }),
        ...(query?.appointment_status_id && {
          appointment_status_id: query.appointment_status_id,
        }),
      },
      relations: { pet: true, vet: true, appointmentStatus: true },
      skip: (page - 1) * limit,
      take: limit,
      order: { appointment_date: 'DESC' },
    });

    return {
      data,
      meta: { total, page, limit, lastPage: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string)  {
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

    const vetId = updateAppointmentDto.vet_id ?? appointment.vet_id;
    const appointmentDate = updateAppointmentDto.appointment_date
      ? new Date(updateAppointmentDto.appointment_date)
      : appointment.appointment_date;

    if (updateAppointmentDto.vet_id || updateAppointmentDto.appointment_date) {
      const conflict = await this.appointmentsRepo.findOne({
        where: {
          vet_id: vetId,
          appointment_date: appointmentDate,
          appointment_id: Not(id),
        },
      });

      if (conflict) {
        throw new ConflictException(
          'This veterinarian already has an appointment scheduled at that time',
        );
      }
    }

    Object.assign(appointment, updateAppointmentDto);
    return this.appointmentsRepo.save(appointment);
  }

  async remove(id: string) {
    const appointment = await this.findOne(id);
    return this.appointmentsRepo.remove(appointment);
  }
}
