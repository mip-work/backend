import { IsArray, IsInt, IsString } from "class-validator";

export abstract class CreateListDto {
    @IsString()
    name: string;

    @IsArray()
    issues: Array<number>;

    @IsInt()
    projectId: number;
}