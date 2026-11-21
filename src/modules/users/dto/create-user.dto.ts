import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    password: string

    @IsString()
    @IsNotEmpty()
    @IsIn([ 'Admin', 'Veterinarian', 'Receptionist', 'Owner' ])
    role: string
}
