import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class PayloadLoginDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    pwd: string;
}