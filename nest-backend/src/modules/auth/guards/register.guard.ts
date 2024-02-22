import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export class RegisterGuard implements CanActivate {

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const tokenAlreadyExist = this.verifyTokenFromHeader(request);

        if (tokenAlreadyExist) {
            throw new BadRequestException("You cannot register if you are already logged in");
        }   
        return true;
    }

    private verifyTokenFromHeader(req: Request) {
        return req.headers.authorization;
    }

}