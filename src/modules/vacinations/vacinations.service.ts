import { Injectable } from '@nestjs/common';
import { CreateVacinationDto } from './dto/create-vacination.dto';
import { UpdateVacinationDto } from './dto/update-vacination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacination } from './entities/vacination.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VacinationsService {
  constructor(
    @InjectRepository(Vacination)
    private readonly vacinationsRepo: Repository<Vacination>
  ){}

  create(createVacinationDto: CreateVacinationDto) {
    const vacination = this.vacinationsRepo.create(createVacinationDto)
    return this.vacinationsRepo.save(vacination);
  }

  findAll() {
    return this.vacinationsRepo.find({
      relations: {
        pet: true
      }
    });
  }
}
