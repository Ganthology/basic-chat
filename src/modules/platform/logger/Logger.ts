import * as Sentry from "@sentry/react-native";

import { formatLogMessage } from "./formatLogMessage";
import type { LogAttributes } from "./LogAttributes";
import { LogLevel } from "./LogLevel";
import { toSentryAttributes } from "./toSentryAttributes";

export abstract class Logger {
  protected abstract readonly module: string;

  info(message: string, attributes?: LogAttributes): void {
    this.log(LogLevel.Info, message, attributes);
  }

  breadcrumb(message: string, attributes?: LogAttributes): void {
    this.log(LogLevel.Breadcrumb, message, attributes);
  }

  warning(message: string, attributes?: LogAttributes): void {
    this.log(LogLevel.Warning, message, attributes);
  }

  error(message: string, attributes?: LogAttributes): void;
  error(error: Error, attributes?: LogAttributes): void;
  error(messageOrError: string | Error, attributes?: LogAttributes): void {
    if (messageOrError instanceof Error) {
      this.log(LogLevel.Error, messageOrError.message, {
        ...attributes,
        errorName: messageOrError.name,
      });
      Sentry.captureException(messageOrError, {
        tags: { module: this.module },
        extra: attributes,
      });
      return;
    }

    this.log(LogLevel.Error, messageOrError, attributes);
  }

  private log(level: LogLevel, message: string, attributes?: LogAttributes): void {
    const formatted = formatLogMessage(this.module, message);
    const sentryAttributes = toSentryAttributes(this.module, attributes);

    switch (level) {
      case LogLevel.Info:
        Sentry.logger.info(formatted, sentryAttributes);
        return;
      case LogLevel.Breadcrumb:
        Sentry.addBreadcrumb({
          category: this.module,
          message: formatted,
          level: "info",
          data: sentryAttributes,
        });
        return;
      case LogLevel.Warning:
        Sentry.logger.warn(formatted, sentryAttributes);
        return;
      case LogLevel.Error:
        Sentry.logger.error(formatted, sentryAttributes);
        return;
      default: {
        const unhandled: never = level;
        throw new Error(`Unhandled log level: ${unhandled}`);
      }
    }
  }
}
