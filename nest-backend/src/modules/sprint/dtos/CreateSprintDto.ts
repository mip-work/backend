import { IsArray, IsDate, IsInt, IsNotEmpty, IsString } from "class-validator";

export abstract class CreateSprintDto {
    @IsNotEmpty({message: "This field cannot be empty"})
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