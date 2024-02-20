import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserServices } from '../services/users.services';
import { Request, Response } from 'express';
import { UpdateUserDTO } from '../dtos/requests/update-user.dto';
import { RestExceptionHandler } from 'src/utils/rest-exception-handler';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth-guard';

@ApiTags('User')
@Controller("user")
export class UserControllers {
  constructor(private userService: UserServices) {}

  @UseGuards(AuthGuard)
  @Get('')
  async findById(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.userService.findById(req.user.id);
      return res
        .status(HttpStatus.OK)
        .json({ data: user, status: HttpStatus.OK });
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async delete(@Req() req: Request, @Res() res: Response) {
    try {
      await this.userService.delete(req.user.id);
      return res.status(HttpStatus.CREATED).json({});
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  async update(
    @Req() req: Request,
    @Body() userDTO: UpdateUserDTO,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.update(req.user.id, userDTO);
      return res
        .status(HttpStatus.OK)
        .json({ data: user, status: HttpStatus.OK });
    } catch (err) {
      return RestExceptionHandler.handleException(err, res);
    }
  }
}
