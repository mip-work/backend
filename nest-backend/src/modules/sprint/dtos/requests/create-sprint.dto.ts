import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSprintDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID()
  projectId: string;

  @ApiProperty()
  @IsDate()
  initialDate: Date;

  @ApiProperty()
  @IsDate()
  finalDate: Date;
}
