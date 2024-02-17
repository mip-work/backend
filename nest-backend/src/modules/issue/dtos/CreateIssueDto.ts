import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

interface PropsCreateIssue {
    priority: number;
    type: number;
    summary: string;
    descr: string;
    listId: number;
    reporterId: number;
    sprintId: number;
    assignees: Array<number>;
}

export class CreateIssueDto {
    @IsInt()
    priority: number;

    @IsInt()
    type: number;

    @IsNotEmpty({message: "Esse campo não pode ser vazio"})
    @IsString()
    summary: string;

    @IsNotEmpty({message: "Esse campo não pode ser vazio"})
    @IsString()
    descr: string;

    @IsInt()
    listId: number | null;

    @IsInt()
    reporterId: number | null;

    @IsInt()
    sprintId: number | null;

    @IsArray()
    assignees: Array<Number>;

    constructor(props: PropsCreateIssue) {
        this.priority = props.priority;
        this.type = props.type;
        this.summary = props.summary;
        this.descr = props.descr;
        this.listId = props.listId;
        this.reporterId = props.reporterId;
        this.sprintId = props.sprintId;
        this.assignees = props.assignees;
    }
}