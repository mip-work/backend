import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSprintDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID()
  issueId: string;

  @ApiProperty()
  @IsDateString()
  initialDate: Date;

  @ApiProperty()
  @IsDateString()
  finalDate: string;
}
