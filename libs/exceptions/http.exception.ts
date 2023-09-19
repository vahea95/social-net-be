import { HttpException } from '@nestjs/common';
import { ResponseStatusCodes } from '../dto/response-status.dto';

export class DefaultHttpException extends HttpException {
  constructor(data: {
    message: string;
    statusCode: number;
    code: ResponseStatusCodes;
    title?: string;
  }) {
    super({ message: data.message, code: data.code }, data.statusCode);
  }
}
