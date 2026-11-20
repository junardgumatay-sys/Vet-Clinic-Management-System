import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAppointmentStatusDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    name: string;
}
