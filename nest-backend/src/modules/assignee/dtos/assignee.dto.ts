import { IsUUID } from 'class-validator';

export class Assignee {
  id: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  issueId: string;

  @IsUUID()
  projectId: string;
}
