import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateMemberDto {
  @IsUUID()
  userId: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  role: Role;
}
