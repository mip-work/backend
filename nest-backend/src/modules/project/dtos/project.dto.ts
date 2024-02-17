import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Assignee } from 'src/modules/assignee/dtos/assignee.dto';
import { List } from 'src/modules/list/dtos/list.dto';
import { Member } from 'src/modules/member/dtos/member.dto';
import { Sprint } from 'src/modules/sprint/dtos/sprint.dto';

export class Project {
  id: string;

  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  descr: string;

  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  repo: string;

  @IsUUID()
  userId: string;

  sprints: Sprint[];

  lists: List[];

  members: Member[];

  assignees: Assignee[];
}
