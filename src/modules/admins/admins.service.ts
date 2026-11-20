import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>
  ){}

  create(createAdminDto: CreateAdminDto) {
    const admin = this.adminRepo.create(createAdminDto)
    return this.adminRepo.save(admin);
  }

  findAll() {
    return this.adminRepo.find({
      relations: {
        user: true
      }
    });
  }
}
