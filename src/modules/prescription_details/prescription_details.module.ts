import { Module } from '@nestjs/common';
import { PrescriptionDetailsService } from './prescription_details.service';
import { PrescriptionDetailsController } from './prescription_details.controller';
import { PrescriptionDetail } from './entities/prescription_detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PrescriptionDetail])],
  controllers: [PrescriptionDetailsController],
  providers: [PrescriptionDetailsService],
})
export class PrescriptionDetailsModule {}
