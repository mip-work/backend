import { IsArray, IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

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
}