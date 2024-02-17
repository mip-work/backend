import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateListDto {
  @IsString()
  name: string;

  @IsInt()
  order: number;

  @IsUUID()
  projectId: string;
}
