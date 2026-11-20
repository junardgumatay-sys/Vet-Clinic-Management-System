import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity'
import { Repository } from 'typeorm';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medecineRepo: Repository<Medicine>,
  ) {}

  create(createMedicineDto: CreateMedicineDto) {
    const medicine = this.medecineRepo.create(createMedicineDto)
    return this.medecineRepo.save(medicine);
  }

  findAll() {
    return this.medecineRepo.find();
  }
}
