import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>
  ) {}  

  create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  findAll() {
    return this.paymentRepository.find({
      relations: {
        appointment: {
          pet: true,
          vet: true,
          appointmentStatus: true
        },
        paymentStatus: true,
        paymentMethod: true
      },
    });
  }

  async findOne(id: string) {
    const payment = await this.paymentRepository.findOne({
      where: { payment_id: id },
      relations: {
        appointment: {
          pet: true,
          vet: true,
          appointmentStatus: true
        },
        paymentStatus: true,
        paymentMethod: true
      },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID "${id}" not found`);
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    Object.assign(payment, updatePaymentDto);
    return this.paymentRepository.save(payment);
  }

  async remove(id: string) {
    const payment = await this.findOne(id);
    return this.paymentRepository.remove(payment);
  }
}
