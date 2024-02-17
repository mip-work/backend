import { IsUUID } from "class-validator";

export abstract class CreateAssigneeDto {
    @IsUUID()
    userId: string;

    @IsUUID()
    issueId: string;

    @IsUUID()
    projectId: string;
}