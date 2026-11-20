import { Module } from '@nestjs/common';
import { VacinationsService } from './vacinations.service';
import { VacinationsController } from './vacinations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacination } from './entities/vacination.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacination])],
  controllers: [VacinationsController],
  providers: [VacinationsService],
})
export class VacinationsModule {}
