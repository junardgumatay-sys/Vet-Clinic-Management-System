import { Module } from '@nestjs/common';
import { PaymentStatusesService } from './payment_statuses.service';
import { PaymentStatusesController } from './payment_statuses.controller';
import { PaymentStatus } from './entities/payment_status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([PaymentStatus])],
  controllers: [PaymentStatusesController],
  providers: [PaymentStatusesService],
})
export class PaymentStatusesModule {}
