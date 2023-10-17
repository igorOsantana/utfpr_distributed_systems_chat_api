import { ConsoleLogger, LoggerService } from '@nestjs/common';

export class LoggerApi extends ConsoleLogger implements LoggerService {
  og(context: string, message: string) {
    super.log(message, context);
  }

  error(context: string, message: string, trace?: string) {
    super.error(message, trace, context);
  }

  warn(context: string, message: string) {
    super.warn(message, context);
  }
}
