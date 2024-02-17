import { IsInt } from "class-validator";

export class CreateAssigneeDto {
    @IsInt()
    userId: number;

    @IsInt()
    issueId: number;

    @IsInt()
    projectId: number;
}