export type SwapsState = {
  isLive: boolean;
  hasOnboarded: boolean;
  featureFlags?: Record<string, unknown>;
  [chainId: string]: unknown;
};
