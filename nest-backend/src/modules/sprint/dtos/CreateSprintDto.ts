import { IsArray, IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export abstract class CreateSprintDto {
    @IsNotEmpty({message: "This field cannot be empty"})
    @IsString()
    name: string;

    @IsUUID()
    projectId: string;

    @IsDate()
    initialDate: Date;

    @IsDate()
    finalDate: Date;

    @IsArray()
    issues: Array<string>;
}