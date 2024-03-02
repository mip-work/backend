import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSprintRecDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID()
  issueId: string;

  @ApiProperty()
  finalDate: string;
}
