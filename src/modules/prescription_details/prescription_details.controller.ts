import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PrescriptionDetailsService } from './prescription_details.service';
import { CreatePrescriptionDetailDto } from './dto/create-prescription_detail.dto';
import { UpdatePrescriptionDetailDto } from './dto/update-prescription_detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Prescription Details')
@ApiBearerAuth()
@Controller('prescription-details')
export class PrescriptionDetailsController {
  constructor(private readonly prescriptionDetailsService: PrescriptionDetailsService) {}

  @Post()
  create(@Body() createPrescriptionDetailDto: CreatePrescriptionDetailDto) {
    return this.prescriptionDetailsService.create(createPrescriptionDetailDto);
  }

  @Get()
  findAll() {
    return this.prescriptionDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.prescriptionDetailsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePrescriptionDetailDto: UpdatePrescriptionDetailDto) {
    return this.prescriptionDetailsService.update(id, updatePrescriptionDetailDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.prescriptionDetailsService.remove(id);
  }
}
