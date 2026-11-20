import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentStatusesController } from './appointment_statuses.controller';
import { AppointmentStatusesService } from './appointment_statuses.service';

describe('AppointmentStatusesController', () => {
  let controller: AppointmentStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentStatusesController],
      providers: [AppointmentStatusesService],
    }).compile();

    controller = module.get<AppointmentStatusesController>(AppointmentStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
