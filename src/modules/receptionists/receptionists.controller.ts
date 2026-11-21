import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReceptionistsService } from './receptionists.service';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Receptionists')
@ApiBearerAuth()
@Controller('receptionists')
export class ReceptionistsController {
  constructor(private readonly receptionistsService: ReceptionistsService) {}

  @Post()
  create(@Body() createReceptionistDto: CreateReceptionistDto) {
    return this.receptionistsService.create(createReceptionistDto);
  }

  @Get()
  findAll() {
    return this.receptionistsService.findAll();
  }
}
