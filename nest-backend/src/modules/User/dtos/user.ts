import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class User {
  id: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'Value must be a string' })
  username: string;

  @IsNotEmpty()
  pwd: string;

  profileUrl?: string;

  lastLoggedIn: Date;

  createdAt: Date;

  updatedAt: Date;
}
