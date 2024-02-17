import { IsArray, IsString, IsUUID } from "class-validator";

export abstract class CreateListDto {
    @IsString()
    name: string;

    @IsArray()
    issues: Array<string>;

    @IsUUID()
    projectId: string;
}