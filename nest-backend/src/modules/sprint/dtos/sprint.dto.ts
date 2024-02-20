import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Issue } from 'src/modules/issue/dtos/issue.dto';

export class Sprint {
  id: string;

  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  name: string;

  @IsUUID()
  projectId: string;

  @IsDate()
  initialDate: Date;

  @IsDate()
  finalDate: Date;

  issues: Issue[];
}
