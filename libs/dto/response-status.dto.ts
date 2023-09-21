export class ResponseStatus {
  code: ResponseStatusCodes | string;

  message: string;
}

export enum ResponseStatusCodes {
  InternalServerError = 'internal_server_error',
  NotFound = 'not_found',
  Succeed = 'succeed',
}
