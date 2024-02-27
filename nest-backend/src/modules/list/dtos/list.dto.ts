import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class List {
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsInt()
  position: number;

  @IsUUID()
  projectId: string;
}
