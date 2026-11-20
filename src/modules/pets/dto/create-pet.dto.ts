import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";

export class CreatePetDto {
    @IsUUID()
    @IsNotEmpty()
    owner_id: string

    @IsUUID()
    @IsNotEmpty()
    breed_id: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    gender: string

    @IsOptional()
    @IsDateString()
    date_of_birth: Date

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    weight_kg: number

    @IsOptional()
    @IsBoolean()
    is_active: boolean
}
