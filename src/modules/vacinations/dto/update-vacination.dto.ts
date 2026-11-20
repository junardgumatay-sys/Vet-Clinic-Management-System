import { PartialType } from '@nestjs/mapped-types';
import { CreateVacinationDto } from './create-vacination.dto';

export class UpdateVacinationDto extends PartialType(CreateVacinationDto) {}
