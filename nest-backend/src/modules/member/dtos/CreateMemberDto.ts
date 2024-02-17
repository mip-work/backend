import { IsUUID } from "class-validator";

export abstract class CreateMemberDto {
    @IsUUID()
    projectId: string;
    
    @IsUUID()
    userId: string;
}