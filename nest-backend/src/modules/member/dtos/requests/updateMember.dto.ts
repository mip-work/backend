import { Role } from '../enums/role.enum';

export interface UpdateMemberDto {
  id?: string;
  userId: string;
  role: Role;
  projectId: string;
}
