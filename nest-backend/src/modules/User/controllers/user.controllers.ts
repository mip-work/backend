import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { UserServices } from '../services/users.services';
import { Response } from 'express';
import { UpdateUserDTO } from '../dtos/requests/update-user.dto';
import { RestExceptionHandler } from 'src/modules/utils/rest-exception-handler';

@Controller('user')
export class UserControllers {
  constructor(private userService: UserServices) {}

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    try {
      const user = await this.userService.findById(id);
      return res
        .status(HttpStatus.OK)
        .json({ data: user, status: HttpStatus.OK });
    } catch (err) {
      if (err instanceof HttpException) {
        return res.status(err.getStatus()).json({
          message: err.message,
          status: err.getStatus(),
        });
      }
      return RestExceptionHandler.handleException(err, res);
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.userService.delete(id);
      return res.status(HttpStatus.CREATED).json({});
    } catch (err) {
      if (err instanceof HttpException) {
        return res.status(err.getStatus()).json({
          message: err.message,
          status: err.getStatus(),
        });
      }
      return RestExceptionHandler.handleException(err, res);
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() userDTO: UpdateUserDTO,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.update(id, userDTO);
      return res
        .status(HttpStatus.OK)
        .json({ data: user, status: HttpStatus.OK });
    } catch (err) {
      if (err instanceof HttpException) {
        return res.status(err.getStatus()).json({
          message: err.message,
          status: err.getStatus(),
        });
      }
      return RestExceptionHandler.handleException(err, res);
    }
  }
}
