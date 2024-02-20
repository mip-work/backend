import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateListDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsInt()
  order: number;
  @ApiProperty()
  @IsUUID()
  projectId: string;
}
