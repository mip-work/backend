import { Body, HttpException, HttpStatus, Injectable, Post } from "@nestjs/common";
import { UserBuilder } from "src/modules/User/builder/user.builder";
import { RegisterUserDTO } from "src/modules/User/dtos/requests/register-user.dto";
import { ViewUserDTO } from "src/modules/User/dtos/responses/view-user.dto";
import { UserRepository } from "src/modules/User/repositories/user.repository";

@Injectable()
export class AuthService {

    constructor(private userRepository: UserRepository) {}

    @Post()
    async register(registerUserDTO: RegisterUserDTO): Promise<ViewUserDTO> {

        if (registerUserDTO.pwd !== registerUserDTO.repeatPwd) {
            throw new HttpException("Passwords are not the same", HttpStatus.BAD_REQUEST);
        }

        const {email, username, pwd, profileUrl} = registerUserDTO;

        const user = await this.userRepository.create({email, username, pwd, profileUrl});
        
        return UserBuilder.createViewUser(user);
    }

}