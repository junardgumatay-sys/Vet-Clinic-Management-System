import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateVacinationDto {
    @IsUUID()
    @IsNotEmpty()
    pet_id: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    vacine_name: string

    @IsDateString()
    @IsNotEmpty()
    administered_date: string

    @IsOptional()
    @IsDateString()
    next_due_date: string
}
