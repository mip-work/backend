import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty({message: "Esse campo não pode ser vazio"})
    @IsString()
    name: string;

    @IsNotEmpty({message: "Esse campo não pode ser vazio"})
    @IsString()
    descr: string;

    @IsNotEmpty({message: "Esse campo não pode ser vazio"})
    @IsString()
    repo: string;

    @IsInt()
    userId: number;
}