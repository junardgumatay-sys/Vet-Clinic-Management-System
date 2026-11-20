import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, Max, MaxLength, Min } from "class-validator";

export class CreatePrescriptionDetailDto {
    @IsUUID()
    @IsNotEmpty()
    prescription_id: string;

    @IsUUID()
    @IsNotEmpty()
    medicine_id: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    dosage: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    quantity: number;
    
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @IsNotEmpty()
    unit_price: number;
}
