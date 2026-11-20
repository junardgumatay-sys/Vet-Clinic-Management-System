import { Test, TestingModule } from '@nestjs/testing';
import { VacinationsController } from './vacinations.controller';
import { VacinationsService } from './vacinations.service';

describe('VacinationsController', () => {
  let controller: VacinationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacinationsController],
      providers: [VacinationsService],
    }).compile();

    controller = module.get<VacinationsController>(VacinationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
