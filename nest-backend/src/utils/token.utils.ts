import { HttpStatus, InternalServerErrorException, Res, UnauthorizedException } from "@nestjs/common";
import { Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { SavePayloadUser } from "src/modules/auth/dtos/save-token-user.dto";

export class TokenJWT {

    static async generateToken(payload: SavePayloadUser, @Res() res: Response) {
        sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: "24h"}, (error, token) => {
            if (error) {
              return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Sorry, the server was unable to process your request" })
            }
            return res.cookie('session-user', payload.id).status(HttpStatus.OK).json({ token, status: HttpStatus.OK, logger: true });
        })
    }

}