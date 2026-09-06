import type { FeatureFlagRepository } from "@/modules/platform/featureFlag/FeatureFlagRepository";

import type { ChatFeatureFlags } from "../entities/ChatFeatureFlags";

export type ChatFeatureFlagRepository = FeatureFlagRepository<ChatFeatureFlags>;
