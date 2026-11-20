import { Injectable } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepo: Repository<Species>,
  ) {}

  create(createSpeciesDto: CreateSpeciesDto) {
    const species = this.speciesRepo.create(createSpeciesDto);
    return this.speciesRepo.save(species);
  }

  findAll() {
    return this.speciesRepo.find();
  }
}
