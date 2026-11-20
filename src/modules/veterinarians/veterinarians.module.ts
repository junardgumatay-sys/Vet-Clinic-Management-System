import { Module } from '@nestjs/common';
import { VeterinariansService } from './veterinarians.service';
import { VeterinariansController } from './veterinarians.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veterinarian } from './entities/veterinarian.entity';

@Module({
  imports: [TypeOrmModule.forFeature.apply([Veterinarian])],
  controllers: [VeterinariansController],
  providers: [VeterinariansService],
})
export class VeterinariansModule {}
