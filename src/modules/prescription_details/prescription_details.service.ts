import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDetailDto } from './dto/create-prescription_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrescriptionDetail } from './entities/prescription_detail.entity';
import { Repository } from 'typeorm';

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
}
