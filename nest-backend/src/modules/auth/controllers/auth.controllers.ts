import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthServices } from '../services/auth.services';
import { RestExceptionHandler } from 'src/utils/rest-exception-handler';
import { RegisterUserDTO } from 'src/modules/User/dtos/requests/register-user.dto';
import { UserServices } from 'src/modules/User/services/users.services';
import { PayloadLoginDTO } from '../dtos/login-user.dto';
import { rmSync } from 'fs';
import { TokenJWT } from 'src/utils/token.utils';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthServices,
    private userService: UserServices,
  ) {}

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
      const loginPayload = await this.authService.login(payload);
      return await TokenJWT.generateToken(loginPayload, res);
    } catch (err) {
      RestExceptionHandler.handleException(err, res);
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    return res.clearCookie("session-user").status(HttpStatus.OK).json({ token: null, status: HttpStatus.OK, logger: false });
  }

}
