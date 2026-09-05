import type { LogAttributes } from "./LogAttributes";

export function toSentryAttributes(module: string, attributes?: LogAttributes): LogAttributes {
  return {
    module,
    ...attributes,
  };
}
