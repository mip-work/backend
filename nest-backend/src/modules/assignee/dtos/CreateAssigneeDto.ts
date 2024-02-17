import { IsInt } from "class-validator";

interface PropsCreateAssignee {
    userId: number;
    issueId: number;
    projectId: number;
}

export class CreateAssigneeDto {
    @IsInt()
    userId: number;

    @IsInt()
    issueId: number;

    @IsInt()
    projectId: number;

    constructor(props: PropsCreateAssignee) {
        this.userId = props.userId;
        this.issueId = props.issueId;
        this.projectId = props.projectId;
    }
}