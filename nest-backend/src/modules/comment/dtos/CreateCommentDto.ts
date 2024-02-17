import { IsInt, IsNotEmpty, IsString } from "class-validator";

interface PropsCreateComment {
    descr: string;
    issueId: number;
    userId: number;
}

export class CreateCommentDto {
    @IsNotEmpty({message: "Este campo não pode ser vazio"})
    @IsString()
    descr: string;

    @IsInt()
    issueId: number;

    @IsInt()
    userId: number;

    constructor(props: PropsCreateComment) {
        this.descr = props.descr;
        this.issueId = props.issueId;
        this.userId = props.userId;
    }
}