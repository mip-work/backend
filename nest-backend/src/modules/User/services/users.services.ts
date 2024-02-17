import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Injectable()
export class UserServices {
  constructor(private userRepository: UserRepository) {}

  async create(userDTO: CreateUserDTO) {
    const user = await this.userRepository.create(userDTO);

    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException("User Not Found", HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async delete(id: string) {
    const user = await this.findById(id);

    await this.userRepository.delete(user.id);

    return user;
  }

  async update(id: string, userDTO: CreateUserDTO) {
    const user = await this.findById(id);

    const userUpdate = await this.userRepository.update(user.id, userDTO);

    return userUpdate;
  }

}
