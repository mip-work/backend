import { IsInt, IsString, IsUUID } from 'class-validator';
import { Issue } from 'src/modules/issue/dtos/issue.dto';

export class List {
  id: string;

  @IsString()
  name: string;

  @IsInt()
  order: number;

  @IsUUID()
  projectId: string;

  issues: Issue[];
}
