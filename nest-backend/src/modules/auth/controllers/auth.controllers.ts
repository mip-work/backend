import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.services';
import { RestExceptionHandler } from 'src/modules/utils/rest-exception-handler';
import { RegisterUserDTO } from 'src/modules/User/dtos/requests/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDTO: RegisterUserDTO, @Res() res: Response) {
    try {
      const user = await this.authService.register(userDTO);
      return res
        .status(HttpStatus.CREATED)
        .json({ data: user, status: HttpStatus.CREATED });
    } catch (err) {
      RestExceptionHandler.handleException(err, res);
    }
  }
}
