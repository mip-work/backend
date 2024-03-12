import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateIssueDTO {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  priority?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  type?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  progress?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descr?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
