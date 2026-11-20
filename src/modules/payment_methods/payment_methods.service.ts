import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment_method.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly payment_methodsRepo: Repository<PaymentMethod>,
  ) {}

  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const paymentMethod = this.payment_methodsRepo.create(createPaymentMethodDto);
    return this.payment_methodsRepo.save(paymentMethod);
  }

  findAll() {
    return this.payment_methodsRepo.find();
  }
}
