import { Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical_record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectRepository(MedicalRecord)
    private readonly medicalRecordsRepo: Repository<MedicalRecord>
  ){}

  create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const medicalRecord = this.medicalRecordsRepo.create(createMedicalRecordDto)
    return this.medicalRecordsRepo.save(medicalRecord);
  }

  findAll() {
    return this.medicalRecordsRepo.find({
      relations : {
        pet: {
          owner: true,
          breed: true
        },
        vet: {
          user: true,
          specialty: true
        },
        appointment : {
          pet: true,
          vet: true,
          appointmentStatus: true
        }
      }
    });
  }

}
