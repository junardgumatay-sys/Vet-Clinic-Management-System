import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrescriptionDetailDto } from './dto/create-prescription_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptionDetail } from './entities/prescription_detail.entity';
import { Repository } from 'typeorm';
import { UpdatePrescriptionDetailDto } from './dto/update-prescription_detail.dto';

@Injectable()
export class PrescriptionDetailsService {
  constructor(
    @InjectRepository(PrescriptionDetail)
    private readonly prescriptionDetailRepository: Repository<PrescriptionDetail>,
  ) {}

  create(createPrescriptionDetailDto: CreatePrescriptionDetailDto) {
    const prescriptionDetail = this.prescriptionDetailRepository.create(createPrescriptionDetailDto); 
    return this.prescriptionDetailRepository.save(prescriptionDetail);
  }

  findAll() {
    return this.prescriptionDetailRepository.find(
      {
        relations: {
          prescription: true,
          medicine: true,
        },
      },
    );
  }

  async findOne(id: string) {
    const prescriptionDetail = await this.prescriptionDetailRepository.findOne({
      where: { detail_id: id },
      relations: {
        prescription: true,
        medicine: true,
      },
    });
    if (!prescriptionDetail) {
      throw new NotFoundException(`Prescription Detail with ID "${id}" not found`);
    }
    return prescriptionDetail;
  }

  async update(id: string, updatePrescriptionDetailDto: UpdatePrescriptionDetailDto) {
    const prescriptionDetail = await this.findOne(id);
    Object.assign(prescriptionDetail, updatePrescriptionDetailDto);
    return this.prescriptionDetailRepository.save(prescriptionDetail);
  }

  async remove(id: string) {
    const prescriptionDetail = await this.findOne(id);
    return this.prescriptionDetailRepository.remove(prescriptionDetail);
  }

}
