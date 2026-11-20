import { Injectable } from '@nestjs/common';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receptionist } from './entities/receptionist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReceptionistsService {
  constructor(
    @InjectRepository(Receptionist)
    private readonly receptionistRepo: Repository<Receptionist>
  ){}

  create(createReceptionistDto: CreateReceptionistDto) {
    const receptionist = this.receptionistRepo.create(createReceptionistDto)
    return this.receptionistRepo.save(receptionist);
  }

  findAll() {
    return this.receptionistRepo.find();
  }
}
