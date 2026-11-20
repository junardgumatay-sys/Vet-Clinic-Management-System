import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateMedicineDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    unit_price: number

    @IsOptional()
    @IsInt()
    @Min(0)
    stock_quantity: number
}