import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty({message: "Este campo não pode ser vazio"})
    @IsString()
    descr: string;

    @IsInt()
    issueId: number;

    @IsInt()
    userId: number;
}