import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDTO {
    @ApiProperty()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsString({ message: 'Value must be a string' })
    username: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    pwd: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    repeatPwd: string;
  
    profileUrl?: string;   
}