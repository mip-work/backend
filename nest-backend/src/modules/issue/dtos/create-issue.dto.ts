import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateIssueDto {
  @IsInt()
  order: number;

  @IsInt()
  priority: number;

  @IsInt()
  type: number;

  @IsInt()
  progress: number;

  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  summary: string;

  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  descr: string;

  @IsUUID()
  listId: string | null;

  @IsUUID()
  reporterId: string | null;

  @IsUUID()
  sprintId: string | null;
}
