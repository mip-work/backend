import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserServices } from '../services/users.services';
import { Response } from 'express';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { RestExceptionHandler } from 'src/modules/utils/rest-exception-handler';

@Controller("user")
export class UserControllers {
  constructor(private userService: UserServices) {}
  @Post("register")
  async create(@Body() userDTO: CreateUserDTO, @Res() res: Response) {
    try {
      const user = await this.userService.create(userDTO);
      return res.status(HttpStatus.CREATED).json({data: user, status: HttpStatus.CREATED});
    } catch (err) {
      RestExceptionHandler.handleException(err, res);
    }    
  }

  @Get(":id")
  async findById(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userService.findById(id);
      return res.status(HttpStatus.OK).json({data: user, status: HttpStatus.OK});  
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({message: err.message, status: err.getStatus()})
    }
  }

  @Delete("delete/:id")
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.userService.delete(id);
    return res.status(HttpStatus.CREATED).json({});
  }

  @Patch("update/:id")
  async update(@Param('id') id: string, @Body() userDTO: UpdateUserDTO, @Res() res: Response) {
    try {
      const user = await this.userService.update(id, userDTO);
      return res.status(HttpStatus.OK).json({data: user, status: HttpStatus.OK});  
    } catch (err) {
      RestExceptionHandler.handleException(err, res);
    }
  }

}
