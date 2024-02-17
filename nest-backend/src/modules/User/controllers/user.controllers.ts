import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserServices } from '../services/users.services';

@Controller('user')
export class UserControllers {
  constructor(private userService: UserServices) {}
  @Post()
  async create(@Body() request: CreateUserDTO) {
    const user = await this.userService.create(request);
    return user;
  }
}
