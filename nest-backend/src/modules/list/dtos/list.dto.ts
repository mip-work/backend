import { IsInt, IsString, IsUUID } from 'class-validator';

export class List {
  id: string;

  @IsString()
  name: string;

  @IsInt()
  order: number;

  @IsUUID()
  projectId: string;
}
