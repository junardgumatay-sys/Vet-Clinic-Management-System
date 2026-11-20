import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateReceptionistDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    first_name: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    last_name: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    phone_number: string
}
