import { ResponseStatus, ResponseStatusCodes } from './response-status.dto';

export class ResponseWrapper<T = unknown> {
  status: ResponseStatus;
  data: T;

  static of<T>(
    data: T,
    code: ResponseStatusCodes,
    message: string = null,
  ): ResponseWrapper<T> {
    return {
      data,
      status: { code, message },
    };
  }

  static actionSucceed<T>(
    data: T = null,
    message?: string,
    code = ResponseStatusCodes.Succeed,
  ): ResponseWrapper<T> {
    return ResponseWrapper.of(data, code, message);
  }
}