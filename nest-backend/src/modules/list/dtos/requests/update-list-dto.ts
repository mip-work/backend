import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateListDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;
}
