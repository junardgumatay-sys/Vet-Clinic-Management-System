import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VeterinariansService } from './veterinarians.service';
import { CreateVeterinarianDto } from './dto/create-veterinarian.dto';

@Controller('veterinarians')
export class VeterinariansController {
  constructor(private readonly veterinariansService: VeterinariansService) {}

  @Post()
  create(@Body() createVeterinarianDto: CreateVeterinarianDto) {
    return this.veterinariansService.create(createVeterinarianDto);
  }

  @Get()
  findAll() {
    return this.veterinariansService.findAll();
  }
}
