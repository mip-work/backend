import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PayloadLoginDTO } from '../dtos/login-user.dto';
import { UserServices } from 'src/modules/User/services/users.services';
import { AuthBuilder } from '../builder/auth.builder';
import { SavePayloadUser } from '../dtos/save-token-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthServices {
  constructor(private userService: UserServices, private jwtService: JwtService) {}

  async login({email, pwd}: PayloadLoginDTO) {
    const user = await this.userService.findByEmail(email);

    const isValidPwd = await compare(pwd, user.pwd);
    
    if (!isValidPwd) {
      throw new UnauthorizedException("Credentials Invalid");
    }

    const payload: SavePayloadUser = AuthBuilder.createPayloadToSaveToken(user);

    const token = this.jwtService.sign(payload);

    return { payload, token }; 
  }

}
