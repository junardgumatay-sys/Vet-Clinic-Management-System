import { Injectable } from '@nestjs/common';
import { CreateVeterinarianDto } from './dto/create-veterinarian.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Veterinarian } from './entities/veterinarian.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VeterinariansService {
  constructor(
    @InjectRepository(Veterinarian)
    private readonly veterinarianRepo: Repository<Veterinarian>
  ){}

  create(createVeterinarianDto: CreateVeterinarianDto) {
    const veterinarian = this.veterinarianRepo.create(createVeterinarianDto)
    return this.veterinarianRepo.save(veterinarian);
  }

  findAll() {
    return this.veterinarianRepo.find({
      relations: {
        user: true,
        specialty: true,
      }
    });
  }
}
