import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const accessToken = this.extractTokenFromHeader(request) || this.getCookie(request);

        if (!accessToken) {
            throw new UnauthorizedException("Access don't authorized");
        }   

        try {
            const payload = await this.jwtService.verifyAsync(accessToken, { secret: process.env.JWT_ACCESS_TOKEN_SECRET });

            request['user'] = payload;
        } catch (err) {
            throw new UnauthorizedException("Access don't authorized");
        }
        return true;
    }

    private extractTokenFromHeader(req: Request) {
        const [type, token] = req.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }

    private getCookie(req: Request) {
        const cookie = req.cookies.access_token;
        return cookie;
    }

}