import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateListDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  position: number;

  @ApiProperty()
  @IsUUID()
  projectId: string;
}
