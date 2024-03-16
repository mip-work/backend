import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsString()
  descr: string;

  @ApiProperty()
  @IsUUID()
  issueId: string;

  @ApiProperty()
  @IsUUID()
  userId: string;
}
