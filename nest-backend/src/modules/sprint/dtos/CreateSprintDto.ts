import { IsArray, IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

interface PropsCreateSprint {
    name: string;
    projectId: number;
    initialDate: Date;
    finalDate: Date;
    issues: Array<number>;
}

export class CreateSprintDto {
    @IsNotEmpty({message: "Preencha o nome da Sprint"})
    @IsString()
    name: string;

    @IsInt()
    projectId: number;

    @IsDate()
    initialDate: Date;

    @IsDate()
    finalDate: Date;

    @IsArray()
    issues: Array<number>;

    constructor(props: PropsCreateSprint) {
        this.name = props.name;
        this.projectId = props.projectId;
        this.initialDate = props.initialDate;
        this.finalDate = props.finalDate;
        this.issues = props.issues;
    }
}