import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentStatusesService } from './appointment_statuses.service';

describe('AppointmentStatusesService', () => {
  let service: AppointmentStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentStatusesService],
    }).compile();

    service = module.get<AppointmentStatusesService>(AppointmentStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
