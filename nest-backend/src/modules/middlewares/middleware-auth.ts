import { HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class MiddlewareAuth implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Access not authorized" });
        }

        const access_token = token.split(" ")[1];

        this.jwtService.verifyAsync(access_token, {secret: process.env.JWT_ACCESS_TOKEN_SECRET})

        next();
    }

}