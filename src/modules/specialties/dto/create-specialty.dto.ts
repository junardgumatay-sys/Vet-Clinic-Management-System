import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSpecialtyDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string
}
