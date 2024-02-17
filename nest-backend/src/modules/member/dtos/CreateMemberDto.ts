import { IsInt } from "class-validator";

interface PropsCreateMember {
    projectId: number;
    userId: number;
}

export class CreateMemberDto {
    @IsInt()
    projectId: number;
    
    @IsInt()
    userId: number;

    constructor(props: PropsCreateMember) {
        this.projectId = props.projectId;
        this.userId = props.userId;
    }
}