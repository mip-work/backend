import { IsInt } from "class-validator";

export class CreateMemberDto {
    @IsInt()
    projectId: number;
    
    @IsInt()
    userId: number;
}