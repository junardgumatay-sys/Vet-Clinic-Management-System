import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { VeterinariansService } from './veterinarians.service';
import { CreateVeterinarianDto } from './dto/create-veterinarian.dto';
import { UpdateVeterinarianDto } from './dto/update-veterinarian.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Veterinarians')
@ApiBearerAuth()
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

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.veterinariansService.findOne(id);
  }

  @Get('user/:user_id')
  findByUserId(@Param('user_id', ParseUUIDPipe) user_id: string) {
    return this.veterinariansService.findByUserId(user_id);
  }

  @Get('license/:license_number')
  findByLicenseNumber(@Param('license_number') license_number: string) {
    return this.veterinariansService.findByLicenseNumber(license_number);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateVeterinarianDto: UpdateVeterinarianDto) {
    return this.veterinariansService.update(id, updateVeterinarianDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.veterinariansService.remove(id);
  }
}
