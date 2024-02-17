import { IsInt, IsNotEmpty, IsString } from "class-validator";

export abstract class CreateCommentDto {
    @IsNotEmpty({message: "This field cannot be empty"})
    @IsString()
    descr: string;

    @IsInt()
    issueId: number;

    @IsInt()
    userId: number;
}