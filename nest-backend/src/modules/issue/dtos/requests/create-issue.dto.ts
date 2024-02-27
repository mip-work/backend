import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateIssueDto {
  @ApiProperty()
  @IsInt()
  order: number;

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
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  summary: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  descr: string;

  @ApiProperty()
  @IsUUID()
  listId: string | null;

  @ApiProperty()
  @IsInt()
  position: number;

  @ApiProperty()
  @IsUUID()
  reporterId: string | null;

  @ApiProperty()
  @IsUUID()
  sprintId: string | null;
}
