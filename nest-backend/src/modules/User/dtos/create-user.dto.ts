import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString({ message: 'Value must be a string' })
  username: string;

  @IsNotEmpty()
  pwd: string;

  profileUrl?: string;
}
