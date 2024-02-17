import { IsArray, IsInt, IsString } from "class-validator";

export class CreateListDto {
    @IsString()
    name: string;

    @IsArray()
    issues: Array<number>;

    @IsInt()
    projectId: number;
}