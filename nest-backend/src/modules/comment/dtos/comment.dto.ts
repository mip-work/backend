import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Comment {
  id: string;

  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  descr: string;

  @IsUUID()
  issueId: string;

  @IsUUID()
  userId: string;
}
