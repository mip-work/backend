import { IsInt } from "class-validator";

export abstract class CreateAssigneeDto {
    @IsInt()
    userId: number;

    @IsInt()
    issueId: number;

    @IsInt()
    projectId: number;
}