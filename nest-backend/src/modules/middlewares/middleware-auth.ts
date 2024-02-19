import { HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

@Injectable()
export class MiddlewareAuth implements NestMiddleware {

    use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Access not authorized" });
        }

        const bearer = token.split(" ")[1];

        verify(bearer, process.env.JWT_ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Access not authorized" });
            }
            const { id, username, email }: any = data;
            
            req.loggedUser = {
                id,
                username,
                email
            };
            next();
        })
    }

}