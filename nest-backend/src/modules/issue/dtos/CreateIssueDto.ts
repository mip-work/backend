import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

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
    assigness: Array<Number>;
}