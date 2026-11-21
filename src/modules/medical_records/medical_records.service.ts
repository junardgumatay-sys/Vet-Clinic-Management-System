import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical_record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from './entities/medical_record.entity';
import { Repository } from 'typeorm';
import { UpdateMedicalRecordDto } from './dto/update-medical_record.dto';

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

  async findOne(id: string) {
    const medicalRecord = await this.medicalRecordsRepo.findOne({
      where: { record_id: id },
      relations: {
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
    if (!medicalRecord) {
      throw new NotFoundException(`Medical Record with ID "${id}" not found`);
    }
    return medicalRecord;
  }

  async update(id: string, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const medicalRecord = await this.findOne(id);
    Object.assign(medicalRecord, updateMedicalRecordDto);
    return this.medicalRecordsRepo.save(medicalRecord);
  }

  async remove(id: string) {
    const medicalRecord = await this.findOne(id);
    return this.medicalRecordsRepo.remove(medicalRecord);
  }

}
