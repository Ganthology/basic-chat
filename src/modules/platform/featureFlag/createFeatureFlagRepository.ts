import type { CreateFeatureFlagRepositoryOptions } from "./CreateFeatureFlagRepositoryOptions";
import type { FeatureFlagRepository } from "./FeatureFlagRepository";
import { FeatureFlagRepositoryImpl } from "./FeatureFlagRepositoryImpl";

export function createFeatureFlagRepository<TFlags extends Record<string, boolean>>(
  options: CreateFeatureFlagRepositoryOptions<TFlags>,
): FeatureFlagRepository<TFlags> {
  return new FeatureFlagRepositoryImpl(options);
}
