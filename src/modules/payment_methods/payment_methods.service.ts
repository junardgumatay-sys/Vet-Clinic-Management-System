import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment_method.entity';
import { Repository } from 'typeorm';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';

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

  async findOne(id: string) {
    const paymentMethod = await this.payment_methodsRepo.findOne({
      where: { payment_method_id: id },
    });
    if (!paymentMethod) {
      throw new Error(`Payment Method with ID "${id}" not found`);
    }
    return paymentMethod;
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const paymentMethod = await this.findOne(id);
    Object.assign(paymentMethod, updatePaymentMethodDto);
    return this.payment_methodsRepo.save(paymentMethod);
  }

  async remove(id: string) {
    const paymentMethod = await this.findOne(id);
    return this.payment_methodsRepo.remove(paymentMethod);
  }

}
