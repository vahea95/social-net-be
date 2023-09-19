import { LogWarn } from '../utils/logger';

export class Config {
  static get<T = unknown>(parameter: string): T {
    const variable = process.env[String(parameter)];

    if (!variable) {
      LogWarn('Get', 'GetSecretFail', {
        parameter,
      });
    }

    return <T>variable;
  }
}
