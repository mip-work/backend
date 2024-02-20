import { IsUUID } from 'class-validator';

export class CreateAssigneeDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  issueId: string;

  @IsUUID()
  projectId: string;
}
