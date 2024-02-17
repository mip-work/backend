import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Issue } from 'src/modules/issue/dtos/issue.dto';
import { Member } from 'src/modules/member/dtos/member.dto';
import { Project } from 'src/modules/project/dtos/project.dto';

export class User {
  id: string;

  @IsEmail()
  email: string;

  @IsString({ message: 'Value must be a string' })
  username: string;

  @IsNotEmpty()
  pwd: string;

  profileUrl?: string;

  members: Member[];

  comments: Comment[];

  projects: Project[];

  issues: Issue[];
}
