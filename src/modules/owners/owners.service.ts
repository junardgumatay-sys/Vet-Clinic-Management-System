import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepo: Repository<Owner>
  ){}

  create(createOwnerDto: CreateOwnerDto) {
    const owner = this.ownerRepo.create(createOwnerDto)
    return this.ownerRepo.save(owner);
  }

  findAll() {
    return this.ownerRepo.find({
      relations: {
        user: true
      }
    });
  }
}
