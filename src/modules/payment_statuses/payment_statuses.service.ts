import { Injectable } from '@nestjs/common';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentStatus } from './entities/payment_status.entity';

@Injectable()
export class PaymentStatusesService {
  constructor(
    @InjectRepository(PaymentStatus)
    private readonly paymentStatusesRepo: Repository<PaymentStatus>
  ){}

  create(createPaymentStatusDto: CreatePaymentStatusDto) {
    const paymentStatus = this.paymentStatusesRepo.create(createPaymentStatusDto);
    return this.paymentStatusesRepo.save(paymentStatus);
  }

  findAll() {
    return this.paymentStatusesRepo.find();
  }
}
