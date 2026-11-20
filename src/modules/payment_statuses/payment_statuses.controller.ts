import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentStatusesService } from './payment_statuses.service';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';

@Controller('payment-statuses')
export class PaymentStatusesController {
  constructor(private readonly paymentStatusesService: PaymentStatusesService) {}

  @Post()
  create(@Body() createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.paymentStatusesService.create(createPaymentStatusDto);
  }

  @Get()
  findAll() {
    return this.paymentStatusesService.findAll();
  }
}
