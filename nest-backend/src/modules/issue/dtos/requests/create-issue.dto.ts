import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateIssueDto {
  @ApiProperty()
  @IsInt()
  priority: number;

  @ApiProperty()
  @IsInt()
  type: number;

  @ApiProperty()
  @IsInt()
  progress: number;

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
  @IsUUID()
  parentId: string | null;

  @ApiProperty()
  @IsUUID()
  sprintId: string | null;
}
