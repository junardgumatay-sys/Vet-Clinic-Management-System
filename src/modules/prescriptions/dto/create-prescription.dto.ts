import { IsDateString, IsNotEmpty, IsUUID } from "class-validator";

export class CreatePrescriptionDto {
    @IsUUID()
    @IsNotEmpty()
    record_id: string;

    @IsDateString()
    @IsNotEmpty()
    issued_date: string;
}
