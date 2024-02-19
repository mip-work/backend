import { HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class RestExceptionHandler {
  static handleException(error: unknown, res: Response) {
    if (error instanceof HttpException) {
      return res
        .status(error.getStatus())
        .json({ message: error.message, status: error.getStatus() });
    }
    throw new HttpException(
      'Error Internal Server',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
