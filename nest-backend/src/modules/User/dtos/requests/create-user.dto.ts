import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
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
  profileUrl?: string;
}