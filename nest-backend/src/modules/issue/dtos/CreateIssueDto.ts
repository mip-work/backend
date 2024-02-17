import { IsArray, IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

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

    @IsUUID()
    listId: string | null;

    @IsUUID()
    reporterId: string | null;

    @IsUUID()
    sprintId: string | null;

    @IsArray()
    assignees: Array<string>;
}