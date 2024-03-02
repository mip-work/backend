import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
  initialDate: string;

  @ApiProperty()
  finalDate: string;
}
