import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePaymentStatusDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    name: string
}
