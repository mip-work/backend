import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSprintDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  initialDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  finalDate?: Date;
}
