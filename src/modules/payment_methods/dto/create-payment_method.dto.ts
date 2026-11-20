import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePaymentMethodDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    name: string
}
