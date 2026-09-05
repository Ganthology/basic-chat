export type ListResponse<T> = {
  total: number;
  limit: number;
  offset: number;
  results: T[];
};
