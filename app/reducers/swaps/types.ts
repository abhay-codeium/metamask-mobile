import { FeatureFlags } from '@metamask/swaps-controller/dist/types';

export interface SwapsAction {
  type: string | null;
  payload?: object | null;
}

export interface SetLivenessPayload {
  chainId: string;
  featureFlags: FeatureFlags | null;
}

export interface SetLivenessAction {
  type: 'SWAPS_SET_LIVENESS';
  payload: SetLivenessPayload;
}

export interface SetHasOnboardedAction {
  type: 'SWAPS_SET_HAS_ONBOARDED';
  payload: boolean;
}

export type SwapsReducerAction = SetLivenessAction | SetHasOnboardedAction;

export interface ChainState {
  isLive: boolean;
  featureFlags?: unknown;
}

export interface SwapsChainFeatureFlags {
  mobile_active?: boolean;
  extension_active?: boolean;
  fallback_to_v1?: boolean;
  fallbackToV1?: boolean;
  mobileActive?: boolean;
  extensionActive?: boolean;
  mobileActiveIOS?: boolean;
  mobileActiveAndroid?: boolean;
  smartTransactions?: {
    expectedDeadline?: number;
    maxDeadline?: number;
    mobileReturnTxHashAsap?: boolean;
    batchStatusPollingInterval?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface SwapsState {
  isLive: boolean;
  hasOnboarded: boolean;
  featureFlags?: {
    smart_transactions?: unknown;
    smartTransactions?: unknown;
  };
  '0x1': ChainState;
  [chainId: string]: ChainState | boolean | unknown | null;
}
