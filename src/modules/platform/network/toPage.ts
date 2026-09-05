import type { ListResponse } from "./ListResponse";
import type { Page } from "./Page";

export function toPage<T>(record: ListResponse<T>): Page<T> {
  return {
    items: record.results,
    total: record.total,
    limit: record.limit,
    offset: record.offset,
  };
}
