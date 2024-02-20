import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthServices } from '../services/auth.services';
import { RestExceptionHandler } from 'src/utils/rest-exception-handler';
import { RegisterUserDTO } from 'src/modules/User/dtos/requests/register-user.dto';
import { UserServices } from 'src/modules/User/services/users.services';
import { PayloadLoginDTO } from '../dtos/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterGuard } from '../guards/register-guard';

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
    try {
      const user = await this.userService.register(userDTO);
      return res
        .status(HttpStatus.CREATED)
        .json({ data: user, status: HttpStatus.CREATED });
    } catch (err) {
      RestExceptionHandler.handleException(err, res);
    }
  }

  @Post('login')
  async login(@Body() payload: PayloadLoginDTO, @Res() res: Response) {
    try {
      const accessToken = await this.authService.login(payload);
      return res.cookie('access_token', accessToken).status(HttpStatus.OK).json({ access_token: accessToken, status: HttpStatus.OK });
    } catch (err) {
      RestExceptionHandler.handleException(err, res);
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return res.clearCookie('access_token').status(HttpStatus.OK).json({ access_token: null, status: HttpStatus.OK });
  }

}
