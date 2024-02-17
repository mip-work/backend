import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

export abstract class CreateIssueDto {
    @IsInt()
    priority: number;

    @IsInt()
    type: number;

    @IsNotEmpty({message: "This field cannot be empty"})
    @IsString()
    summary: string;

    @IsNotEmpty({message: "This field cannot be empty"})
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
}