import type { ListParams } from "./ListParams";
import type { Page } from "./Page";

export function getNextPageParam<T>(lastPage: Page<T>): ListParams | undefined {
  if (lastPage.items.length === 0) {
    return undefined;
  }

  const nextOffset = lastPage.offset + lastPage.items.length;
  if (nextOffset >= lastPage.total) {
    return undefined;
  }

  return { limit: lastPage.limit, offset: nextOffset };
}
