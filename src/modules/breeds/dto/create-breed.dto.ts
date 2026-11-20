import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateBreedDto {
    @IsUUID()
    @IsNotEmpty()
    species_id: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string
}
