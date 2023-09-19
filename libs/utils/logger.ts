import { Logger } from '@nestjs/common';
import { LoggerContext } from '../types/logger';

export const loggerPayload = <T>(
  context: LoggerContext,
  data: T,
): LoggerContext & T => {
  const { functionName, eventName } = context;

  return { functionName, eventName, ...data };
};

export const LogWarn = (
  functionName: string,
  eventName: string,
  data: Record<string, unknown>,
): void => {
  Logger.warn(loggerPayload({ functionName, eventName }, data));
};
