import { IsArray, IsInt, IsString } from "class-validator";

interface PropsCreateList {
    name: string;
    issues: Array<number>;
    projectId: number;
}

export class CreateListDto {
    @IsString()
    name: string;

    @IsArray()
    issues: Array<number>;

    @IsInt()
    projectId: number;

    constructor(props: PropsCreateList) {
        this.name = props.name;
        this.issues = props.issues;
        this.projectId = props.projectId;
    }
}