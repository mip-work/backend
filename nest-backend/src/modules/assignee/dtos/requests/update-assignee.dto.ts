import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateAssigneeDto {
    @ApiProperty()
    @IsUUID()
    userId: string;

    @ApiProperty()
    @IsUUID()
    issueId: string;

    @ApiProperty()
    @IsUUID()
    projectId: string;
}
