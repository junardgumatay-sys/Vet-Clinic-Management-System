import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';

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
}
