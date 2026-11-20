import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
  ) {}

  create(createPrescriptionDto: CreatePrescriptionDto) {
    const prescription = this.prescriptionRepository.create(createPrescriptionDto);
    return this.prescriptionRepository.save(prescription);
  }

  findAll() {
    return this.prescriptionRepository.find({
      relations: {
        medicalRecord: {
          pet: true,
          vet: {
            user: true,
          },
        },
      },
    });
  }
}
