import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentStatus } from './entities/payment_status.entity';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';

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

  async findOne(id: string) {
    const paymentStatus = await this.paymentStatusesRepo.findOne({
      where: { payment_status_id: id }
    });
    if (!paymentStatus) {
      throw new NotFoundException(`Payment status with ID "${id}" not found`);
    }
    return paymentStatus;
  }

  async update(id: string, updatePaymentStatusDto: UpdatePaymentStatusDto) {
    const paymentStatus = await this.findOne(id);
    Object.assign(paymentStatus, updatePaymentStatusDto);
    return this.paymentStatusesRepo.save(paymentStatus);
  }

  async remove(id: string) {
    const paymentStatus = await this.findOne(id);
    return this.paymentStatusesRepo.remove(paymentStatus);
  }

}
