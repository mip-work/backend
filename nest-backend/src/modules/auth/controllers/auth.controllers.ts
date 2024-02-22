import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthServices } from '../services/auth.services';
import { RegisterUserDTO } from 'src/modules/User/dtos/requests/register-user.dto';
import { UserServices } from 'src/modules/User/services/users.services';
import { PayloadLoginDTO } from '../dtos/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterGuard } from '../guards/register.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthServices,
    private userService: UserServices,
  ) {}

  @UseGuards(RegisterGuard)
  @Post('register')
  async register(@Body() userDTO: RegisterUserDTO, @Res() res: Response) {
    const user = await this.userService.register(userDTO);
    return res
      .status(HttpStatus.CREATED)
      .json({ data: user, status: HttpStatus.CREATED });
  }

  @Post('login')
  async login(@Body() payload: PayloadLoginDTO, @Req() req: Request, @Res() res: Response) {
    const data = await this.authService.login(payload);
    req['user'] = data.payload;
    return res.cookie('access_token', data.token).status(HttpStatus.OK).json({ access_token: data.token, status: HttpStatus.OK });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return res.clearCookie('access_token').status(HttpStatus.OK).json({ access_token: null, status: HttpStatus.OK });
  }

}
