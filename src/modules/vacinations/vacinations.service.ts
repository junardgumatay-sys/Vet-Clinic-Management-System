import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const vacination = await this.vacinationsRepo.findOne({
      where: { vacination_id: id },
      relations: {
        pet: true
      }
    });
    if (!vacination) {
      throw new NotFoundException(`Vacination with ID "${id}" not found`);
    }
    return vacination;
  }

  async update(id: string, updateVacinationDto: UpdateVacinationDto) {
    const vacination = await this.findOne(id);
    Object.assign(vacination, updateVacinationDto);
    return this.vacinationsRepo.save(vacination);
  }

  async remove(id: string) {
    const vacination = await this.findOne(id);
    return this.vacinationsRepo.remove(vacination);
  }

}
