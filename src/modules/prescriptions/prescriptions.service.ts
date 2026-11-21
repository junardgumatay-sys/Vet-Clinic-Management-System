import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { Repository } from 'typeorm';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';

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

  async findOne(id: string) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { prescription_id: id },
      relations: {
        medicalRecord: {
          pet: true,
          vet: {
            user: true,
          },
        },
      },
    });
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID "${id}" not found`);
    }
    return prescription;
  }

  async update(id: string, updatePrescriptionDto: UpdatePrescriptionDto) {
    const prescription = await this.findOne(id);
    Object.assign(prescription, updatePrescriptionDto);
    return this.prescriptionRepository.save(prescription);
  }

  async remove(id: string) {
    const prescription = await this.findOne(id);
    return this.prescriptionRepository.remove(prescription);
  }

}