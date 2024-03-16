import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PayloadLoginDTO } from '../dtos/login-user.dto';
import { UserServices } from 'src/modules/User/services/users.services';
import { AuthBuilder } from '../builder/auth.builder';
import { SavePayloadUser } from '../dtos/save-token-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PayloadChangePwdDTO } from '../dtos/change-pwd-user.dto';

@Injectable()
export class AuthServices {
  constructor(private userService: UserServices, private jwtService: JwtService) {}

  async login({email, pwd}: PayloadLoginDTO) {
    const user = await this.userService.findByEmail(email);

    const pwdValid = await this.isValidPwd(pwd, user.pwd);

    if (!pwdValid) {
      throw new UnauthorizedException("Credentials Invalid");
    }

    const payload: SavePayloadUser = AuthBuilder.createPayloadToSaveToken(user);

    const token = this.jwtService.sign(payload);

    return { payload, token }; 
  }

  async changePwd({email, currentPwd, newPwd, repeatNewPwd}: PayloadChangePwdDTO) {
    const user = await this.userService.findByEmail(email);

    const pwdValid = await this.isValidPwd(currentPwd, user.pwd);

    if (!pwdValid) {
      throw new UnauthorizedException("Current Password Incorrect");
    }

    if (newPwd != repeatNewPwd) {
      throw new BadRequestException("Passwords are not the same");
    }

    const userUpdate = await this.userService.changePwd(user.id, newPwd);

    return userUpdate;
  }

  async isValidPwd(pwd: string, hash: string): Promise<boolean> {
    return await compare(pwd, hash);
  }

}
