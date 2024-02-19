import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PayloadLoginDTO } from '../dtos/login-user.dto';
import { UserServices } from 'src/modules/User/services/users.services';
import { AuthBuilder } from '../builder/auth.builder';
import { SavePayloadUser } from '../dtos/save-token-user.dto';

@Injectable()
export class AuthServices {
  constructor(private userService: UserServices) {}

  async login({email, pwd}: PayloadLoginDTO) {
    const user = await this.userService.findByEmail(email);

    if (user.pwd !== pwd) {
      throw new UnauthorizedException("Credentials Invalid");
    }

    const payload: SavePayloadUser = AuthBuilder.createPayloadToSaveToken(user);

    return payload; 
  }

}
