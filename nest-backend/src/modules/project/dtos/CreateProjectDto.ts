import { IsInt, IsNotEmpty, IsString } from "class-validator";

interface PropsCreateProject {
    name: string;
    descr: string;
    repo: string;
    userId: number;
}

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

    constructor(props: PropsCreateProject) {
        this.name = props.name;
        this.descr = props.descr;
        this.repo = props.repo;
        this.userId = props.userId;
    }
}