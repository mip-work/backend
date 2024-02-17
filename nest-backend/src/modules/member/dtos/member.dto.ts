import { IsUUID } from 'class-validator';

export class Member {
  id: string;

  @IsUUID()
  projectId: string;

  @IsUUID()
  userId: string;

  isAdmin: boolean;
}
