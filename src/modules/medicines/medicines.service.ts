import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity'
import { Repository } from 'typeorm';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

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
  
  async findOne(id: string) {
    const medicine = await this.medecineRepo.findOne({
      where: { medicine_id: id },
    });
    if (!medicine) {
      throw new NotFoundException(`Medicine with ID "${id}" not found`);
    }
    return medicine;
  }

  async update(id: string, updateMedicineDto: UpdateMedicineDto) {
    const medicine = await this.findOne(id);
    Object.assign(medicine, updateMedicineDto);
    return this.medecineRepo.save(medicine);
  }

  async remove(id: string) {
    const medicine = await this.findOne(id);
    return this.medecineRepo.remove(medicine);
  }
}
