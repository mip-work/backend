import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDTO {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    username?: string;
}