import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepo: Repository<Pet>
  ){}

  create(createPetDto: CreatePetDto) {
    const pet = this.petsRepo.create(createPetDto)
    return this.petsRepo.save(pet);
  }

  findAll() {
    return this.petsRepo.find({
      relations: {
        owner: true,
        breed: {
          species: true
        }
      }
    });
  }

  async findOne(id: string) {
    const pet = await this.petsRepo.findOne({
      where: { pet_id: id },
      relations: {
        owner: true,
        breed: {
          species: true
        }
      }
    });

    if (!pet) {
      throw new NotFoundException(`Pet with ID "${id}" not found`);
    }
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    const pet = await this.findOne(id);
    Object.assign(pet, updatePetDto);
    return this.petsRepo.save(pet);
  }

  async remove(id: string) {
    const pet = await this.findOne(id);
    return this.petsRepo.remove(pet);
  }
}
