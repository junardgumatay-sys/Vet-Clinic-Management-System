import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VacinationsService } from './vacinations.service';
import { CreateVacinationDto } from './dto/create-vacination.dto';
import { UpdateVacinationDto } from './dto/update-vacination.dto';

@Controller('vacinations')
export class VacinationsController {
  constructor(private readonly vacinationsService: VacinationsService) {}

  @Post()
  create(@Body() createVacinationDto: CreateVacinationDto) {
    return this.vacinationsService.create(createVacinationDto);
  }

  @Get()
  findAll() {
    return this.vacinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacinationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacinationDto: UpdateVacinationDto) {
    return this.vacinationsService.update(+id, updateVacinationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacinationsService.remove(+id);
  }
}
