import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepo: Repository<Breed>, 
  ) {}

  create(createBreedDto: CreateBreedDto) {
    const breed = this.breedRepo.create(createBreedDto)
    return this.breedRepo.save(breed);
  }

  findAll() {
    return this.breedRepo.find({
      relations: {
        species: true,
      },
    });
  }
}
