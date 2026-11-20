import { Test, TestingModule } from '@nestjs/testing';
import { VacinationsService } from './vacinations.service';

describe('VacinationsService', () => {
  let service: VacinationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacinationsService],
    }).compile();

    service = module.get<VacinationsService>(VacinationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
