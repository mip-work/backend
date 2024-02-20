import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  descr: string;

  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  repo: string;

  @IsUUID()
  userId: string;
}
