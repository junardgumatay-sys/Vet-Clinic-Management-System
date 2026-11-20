import { Injectable } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtiesRepo: Repository<Specialty>,
  ) {}

  create(createSpecialtyDto: CreateSpecialtyDto) {
    const specialty = this.specialtiesRepo.create(createSpecialtyDto);
    return this.specialtiesRepo.save(specialty);
  }

  findAll() {
    return this.specialtiesRepo.find();
  }
}
