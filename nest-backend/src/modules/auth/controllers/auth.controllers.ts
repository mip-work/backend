import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthServices } from '../services/auth.services';
import { RestExceptionHandler } from 'src/modules/utils/rest-exception-handler';
import { RegisterUserDTO } from 'src/modules/User/dtos/requests/register-user.dto';
import { UserServices } from 'src/modules/User/services/users.services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServices, private userService: UserServices) {}

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
}
