import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    if (exception instanceof HttpException) {
      const error = exception.getResponse();

      return response
        .status(exception.getStatus())
        .json({ response: error, timestamp: new Date().toISOString() });
    } else {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error Internal Server' });
    }
  }
}
