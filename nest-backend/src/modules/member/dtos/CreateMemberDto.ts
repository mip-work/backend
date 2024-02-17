import { IsInt } from "class-validator";

export abstract class CreateMemberDto {
    @IsInt()
    projectId: number;
    
    @IsInt()
    userId: number;
}