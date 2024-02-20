import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString({ message: 'Value must be a string' })
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  pwd: string;

  profileUrl?: string;
}