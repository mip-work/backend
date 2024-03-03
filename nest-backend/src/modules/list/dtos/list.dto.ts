import { IsOptional, IsString, IsUUID } from 'class-validator';

export class List {
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsUUID()
  projectId: string;

  @IsOptional()
  @IsUUID()
  parentId: string;

  createdAt: Date;
  updatedAt: Date;
}
