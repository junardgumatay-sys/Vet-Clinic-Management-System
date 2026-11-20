import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAppointmentDto {
    @IsUUID()
    @IsNotEmpty()
    pet_id: string

    @IsUUID()
    @IsNotEmpty()
    vet_id: string

    @IsUUID()
    @IsNotEmpty()
    appointment_status_id: string

    @IsDateString()
    @IsNotEmpty()
    appointment_date: string;

    @IsOptional()
    @IsString()
    reason: string
}
