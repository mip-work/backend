import { IsUUID } from 'class-validator';

export class CreateMemberDto {
  @IsUUID()
  projectId: string;

  @IsUUID()
  userId: string;

  isAdmin: boolean;
}
