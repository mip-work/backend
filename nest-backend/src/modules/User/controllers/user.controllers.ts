import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserServices } from '../services/users.services';
import { api } from 'src/utils/url-base';

@Controller(api.url)
export class UserControllers {
  constructor(private userService: UserServices) {}
  @Post("register")
  async create(@Body() request: CreateUserDTO) {
    const user = await this.userService.create(request);
    return user;
  }

  @Get("user/:id")
  async findById(@Param('id') id) {
    const user = await this.userService.findById(id);
    return user;
  }

  @Delete("user/delete/:id")
  async delete(@Param('id') id) {
    const user = await this.userService.delete(id);
    return user;
  }

  @Put("user/update/:id")
  async update(@Param('id') id, @Body() userDTO: CreateUserDTO) {
    const user = await this.userService.update(id, userDTO);
    return user;
  }
}
