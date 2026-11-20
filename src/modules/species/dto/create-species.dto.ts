import { IsNotEmpty, MaxLength, IsString } from "class-validator";

export class CreateSpeciesDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;
}
