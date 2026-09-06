export type CreateFeatureFlagRepositoryOptions<TFlags extends Record<string, boolean>> = {
  namespace: string;
  defaults: TFlags;
};
