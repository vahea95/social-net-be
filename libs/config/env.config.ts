import { LogWarn } from '../utils/logger';
import { devConfig } from './dev.config';

export class Config {
  static get<T = unknown>(parameter: string): T {
    const config = { ...devConfig, ...process.env };
    const variable = config[parameter];

    if (!variable) {
      LogWarn('Get', 'GetSecretFail', {
        parameter,
      });
    }
    return <T>variable;
  }
}
