import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Injectable()
export class UserServices {
  constructor(private userRepository: UserRepository) {}

  async create(dto: CreateUserDTO) {
    const user = await this.userRepository.create(dto);

    return user;
  }
}
