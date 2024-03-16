import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserServices } from '../services/users.services';
import { Request, Response } from 'express';
import { UpdateUserDTO } from '../dtos/requests/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@ApiTags('User')
@Controller("user")
export class UserControllers {
  constructor(private userService: UserServices) {}

  @UseGuards(AuthGuard)
  @Get()
  async findById(@Req() req: Request, @Res() res: Response) {
      const user = await this.userService.findById(req.user.id);
      return res
        .status(HttpStatus.OK)
        .json({ data: user, status: HttpStatus.OK });
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async delete(@Req() req: Request, @Res() res: Response) {
      await this.userService.delete(req.user.id);
      return res.status(HttpStatus.OK).json({});
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  async update(
    @Req() req: Request,
    @Body() userDTO: UpdateUserDTO,
    @Res() res: Response,
  ) {
      const user = await this.userService.update(req.user.id, userDTO);
      return res
        .status(HttpStatus.OK)
        .json({ data: user, status: HttpStatus.OK });
  }
}
