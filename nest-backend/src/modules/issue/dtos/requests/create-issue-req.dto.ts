import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateIssueReqDto {
  @ApiProperty()
  @IsInt()
  priority: number;

  @ApiProperty()
  @IsInt()
  type: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descr: string;

  @ApiProperty()
  @IsUUID()
  listId: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  parentId: string | null;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  sprintId: string | null;
}
