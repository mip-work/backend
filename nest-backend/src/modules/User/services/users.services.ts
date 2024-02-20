import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserBuilder } from '../builder/user.builder';
import { ViewUserDTO } from '../dtos/responses/view-user.dto';
import { UpdateUserDTO } from '../dtos/requests/update-user.dto';
import { RegisterUserDTO } from '../dtos/requests/register-user.dto';

@Injectable()
export class UserServices {
  constructor(private userRepository: UserRepository) {}

  async register(registerUserDTO: RegisterUserDTO): Promise<ViewUserDTO> {
    if (registerUserDTO.pwd !== registerUserDTO.repeatPwd) {
      throw new HttpException(
        'Passwords are not the same',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { email, username, pwd, profileUrl } = registerUserDTO;

    const user = await this.userRepository.create({
      email,
      username,
      pwd,
      profileUrl,
    });

    return UserBuilder.createViewUser(user);
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    const viewUser: ViewUserDTO = UserBuilder.createViewUser(user);

    return viewUser;
  }

  async delete(id: string) {
    const user = await this.findById(id);

    await this.userRepository.delete(user.id);

    return user;
  }

  async update(id: string, userDTO: UpdateUserDTO) {
    const user = await this.findById(id);

    const userUpdate = await this.userRepository.update(user.id, userDTO);

    const viewUser: ViewUserDTO = UserBuilder.createViewUser(userUpdate);

    return viewUser;
  }
}
