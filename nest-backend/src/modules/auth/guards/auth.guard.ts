import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRepository } from 'src/modules/User/repositories/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken =
      this.extractTokenFromHeader(request) || this.getCookie(request);

    if (!accessToken) {
      throw new UnauthorizedException("Access don't authorized");
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });

      const user = await this.userRepository.findById(payload.id);

      if (!user) {
        throw new UnauthorizedException("Access don't authorized");
      }

      const { pwd, ...rest } = user;
      request['user'] = rest;
    } catch (err) {
      throw new UnauthorizedException("Access don't authorized");
    }
    return true;
  }

  private extractTokenFromHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getCookie(req: Request) {
    const cookie = req.cookies.access_token;
    return cookie;
  }
}
