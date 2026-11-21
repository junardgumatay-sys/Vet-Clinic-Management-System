import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVeterinarianDto } from './dto/create-veterinarian.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Veterinarian } from './entities/veterinarian.entity';
import { Repository } from 'typeorm';
import { UpdateVeterinarianDto } from './dto/update-veterinarian.dto';

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

  async findOne(id: string) {
    const veterinarian = await this.veterinarianRepo.findOne({
      where: { vet_id: id },
      relations: {
        user: true,
        specialty: true,
      }
    });
    if (!veterinarian) {
      throw new NotFoundException(`Veterinarian with ID "${id}" not found`);
    }
    return veterinarian;
  }

  async findByUserId(user_id: string) {
    const veterinarian = await this.veterinarianRepo.findOne({
      where: { user_id },
      relations: {
        user: true,
        specialty: true,
      }
    });
    if (!veterinarian) {
      throw new NotFoundException(`Veterinarian with User ID "${user_id}" not found`);
    }
    return veterinarian;
  }

  async findByLicenseNumber(license_number: string) {
    const veterinarian = await this.veterinarianRepo.findOne({
      where: { license_number: license_number },
      relations: {
        user: true,
        specialty: true,
      }
    });

    if (!veterinarian) {
      throw new NotFoundException(`Veterinarian with License Number "${license_number}" not found`);
    }
    return veterinarian;
  }

  async update(id: string, updateVeterinarianDto: UpdateVeterinarianDto) {
    const veterinarian = await this.findOne(id);
    Object.assign(veterinarian, updateVeterinarianDto);
    return this.veterinarianRepo.save(veterinarian);
  }

  async remove(id: string) {
    const veterinarian = await this.findOne(id);
    return this.veterinarianRepo.remove(veterinarian);
  }

}
