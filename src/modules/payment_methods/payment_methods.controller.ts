import { Controller, Get, Post, Body, Patch, Param, Delete, } from '@nestjs/common';
import { PaymentMethodsService } from './payment_methods.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodsService.create(createPaymentMethodDto);
  }

  @Get()
  findAll() {
    return this.paymentMethodsService.findAll();
  }
}
