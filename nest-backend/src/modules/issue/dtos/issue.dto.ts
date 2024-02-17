import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Assignee } from 'src/modules/assignee/dtos/assignee.dto';
import { Comment } from 'src/modules/comment/dtos/comment.dto';

export class Issue {
  id: string;

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

  comments: Comment[];

  assignees: Assignee[];
}
