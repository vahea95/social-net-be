import { HttpStatus } from '@nestjs/common';
import { DefaultHttpException } from './http.exception';
import { ResponseStatusCodes } from '../dto/response-status.dto';

export class NotFoundException extends DefaultHttpException {
  constructor(message: string) {
    super({
      message: message,
      statusCode: HttpStatus.NOT_FOUND,
      code: ResponseStatusCodes.NotFound,
    });
  }
}
