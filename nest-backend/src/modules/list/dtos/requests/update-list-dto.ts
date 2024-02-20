import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateListDTO {
@IsOptional()
@IsString()
name: string;

@IsOptional()
@IsInt()
order: number;
}