import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMedicalRecordDto {
    @IsUUID()
    @IsNotEmpty()
    pet_id: string

    @IsUUID()
    @IsNotEmpty()
    vet_id: string
    
    @IsUUID()
    @IsNotEmpty()
    appointment_id: string

    @IsDateString()
    @IsNotEmpty()
    visit_date: string

    @IsOptional()
    @IsString()
    diagnosis?: string

    @IsOptional()
    @IsString()
    treatment_plan: string
}
