import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class PayloadChangePwdDTO {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    currentPwd: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    newPwd: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    repeatNewPwd: string;
}
