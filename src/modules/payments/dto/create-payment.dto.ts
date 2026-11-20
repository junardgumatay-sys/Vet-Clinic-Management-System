import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from "class-validator";

export class CreatePaymentDto {
    @IsUUID()
    @IsNotEmpty()
    appointment_id: string;

    @IsUUID()
    @IsNotEmpty()
    payment_status_id: string;

    @IsUUID()
    @IsNotEmpty()
    payment_method_id: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @IsNotEmpty()
    amount: number;

    @IsOptional()
    @IsDateString()
    paid_at: string;
}
