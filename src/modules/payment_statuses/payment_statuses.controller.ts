import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PaymentStatusesService } from './payment_statuses.service';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment Statuses')
@ApiBearerAuth()
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

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentStatusesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePaymentStatusDto: UpdatePaymentStatusDto) {
    return this.paymentStatusesService.update(id, updatePaymentStatusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.paymentStatusesService.remove(id);
  }
}
