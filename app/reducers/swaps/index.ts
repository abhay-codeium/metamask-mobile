import { createSelector } from 'reselect';
import type { AnyAction } from 'redux';
import { isMainnetByChainId } from '../../util/networks';
import { safeToChecksumAddress, areAddressesEqual } from '../../util/address';
import { lte } from '../../util/lodash';
import { selectEvmChainId } from '../../selectors/networkController';
import {
  selectAllTokens,
  selectTokens,
} from '../../selectors/tokensController';
import { selectTokenList } from '../../selectors/tokenListController';
import { selectContractBalances } from '../../selectors/tokenBalancesController';
import { getChainFeatureFlags, getSwapsLiveness } from './utils';
import { allowedTestnetChainIds } from '../../components/UI/Swaps/utils';
import { NETWORKS_CHAIN_ID } from '../../constants/network';
import { selectSelectedInternalAccountAddress } from '../../selectors/accountsController';
import { CHAIN_ID_TO_NAME_MAP } from '@metamask/swaps-controller/dist/constants';
import { invert, omit } from 'lodash';
import { createDeepEqualSelector } from '../../selectors/util';
import { toHex } from '@metamask/controller-utils';
import type { SwapsState, SwapsReducerAction, SwapsChainFeatureFlags } from './types';
import type { SwapsControllerState } from '@metamask/swaps-controller';

export const getFeatureFlagChainId = (chainId: string): string =>
  typeof __DEV__ !== 'undefined' &&
  __DEV__ &&
  allowedTestnetChainIds.includes(chainId as `0x${string}`)
    ? NETWORKS_CHAIN_ID.MAINNET
    : chainId;

export const SWAPS_SET_LIVENESS = 'SWAPS_SET_LIVENESS';
export const SWAPS_SET_HAS_ONBOARDED = 'SWAPS_SET_HAS_ONBOARDED';
const MAX_TOKENS_WITH_BALANCE = 5;

export const setSwapsLiveness = (chainId: string, featureFlags: unknown) => ({
  type: SWAPS_SET_LIVENESS,
  payload: { chainId, featureFlags },
});
export const setSwapsHasOnboarded = (hasOnboarded: boolean) => ({
  type: SWAPS_SET_HAS_ONBOARDED,
  payload: hasOnboarded,
});

interface Token {
  address: string;
  decimals: number | string;
  hasBalanceError?: boolean;
  image?: string;
  [key: string]: unknown;
}

interface ProcessedToken {
  occurrences: number;
  address: string;
  decimals: number;
  [key: string]: unknown;
}

function processToken(token: Token | null | undefined): ProcessedToken | null {
  if (!token) return null;
  const { hasBalanceError, image, ...tokenData } = token;
  return {
    occurrences: 0,
    ...tokenData,
    decimals: Number(tokenData.decimals),
    address: tokenData.address.toLowerCase(),
  };
}

function combineTokens(
  tokenSources: (Token[] | undefined)[],
): ProcessedToken[] {
  const tokenMap = new Map<string, ProcessedToken>();

  for (const tokens of tokenSources) {
    if (!tokens) continue;

    for (const token of tokens) {
      const processedToken = processToken(token);
      if (processedToken && !tokenMap.has(processedToken.address)) {
        tokenMap.set(processedToken.address, processedToken);
      }
    }
  }

  return Array.from(tokenMap.values());
}

interface TokenList {
  [address: string]: {
    name: string;
    [key: string]: unknown;
  };
}

function addMetadata(
  chainId: string,
  tokens: ProcessedToken[],
  tokenList: TokenList,
): ProcessedToken[] {
  if (!isMainnetByChainId(chainId)) {
    return tokens;
  }
  return tokens.map((token) => {
    const checksummedAddress = safeToChecksumAddress(token.address);
    const tokenMetadata = checksummedAddress ? tokenList[checksummedAddress] : undefined;
    if (tokenMetadata) {
      return { ...token, name: tokenMetadata.name };
    }

    return token;
  });
}

const chainIdSelector = selectEvmChainId;
const swapsStateSelector = (state: { swaps: SwapsState }): SwapsState =>
  state.swaps;

export const swapsLivenessSelector = createSelector(
  swapsStateSelector,
  chainIdSelector,
  (swapsState, chainId) => {
    const chainState = swapsState[chainId] as { isLive?: boolean } | undefined;
    return chainState?.isLive || false;
  },
);

export const swapsLivenessMultichainSelector = createSelector(
  [swapsStateSelector, (_state: unknown, chainId: string) => chainId],
  (swapsState, chainId) => {
    const chainState = swapsState[chainId] as { isLive?: boolean } | undefined;
    return chainState?.isLive || false;
  },
);

export const swapsSmartTxFlagEnabled = createSelector(
  swapsStateSelector,
  (swapsState) => {
    const globalFlags = swapsState.featureFlags;
    const isEnabled = Boolean(
      (globalFlags as { smartTransactions?: { mobileActive?: boolean } })
        ?.smartTransactions?.mobileActive,
    );
    return isEnabled;
  },
);

export const selectSwapsChainFeatureFlags = createSelector(
  swapsStateSelector,
  (_state: unknown, transactionChainId?: string) =>
    transactionChainId || selectEvmChainId(_state as any),
  (swapsState, chainId): SwapsChainFeatureFlags => {
    const chainState = swapsState[chainId] as
      | { featureFlags?: unknown }
      | undefined;
    const chainFlags = chainState?.featureFlags || {};
    const globalFlags = swapsState.featureFlags || {};
    
    const chainSmartTransactions = (chainFlags as { smartTransactions?: unknown })?.smartTransactions;
    const globalSmartTransactions = (globalFlags as { smartTransactions?: unknown })?.smartTransactions;
    
    return {
      ...chainFlags,
      smartTransactions: {
        ...(typeof chainSmartTransactions === 'object' && chainSmartTransactions !== null ? chainSmartTransactions : {}),
        ...(typeof globalSmartTransactions === 'object' && globalSmartTransactions !== null ? globalSmartTransactions : {}),
      },
    } as SwapsChainFeatureFlags;
  },
);

export const swapsHasOnboardedSelector = createSelector(
  swapsStateSelector,
  (swapsState) => swapsState.hasOnboarded,
);

const selectSwapsControllerState = (state: {
  engine: { backgroundState: { SwapsController: SwapsControllerState } };
}): SwapsControllerState => state.engine.backgroundState.SwapsController;

export const swapsControllerTokens = (state: {
  engine: { backgroundState: { SwapsController: SwapsControllerState } };
}): Token[] | undefined =>
  state.engine.backgroundState.SwapsController.tokens ?? undefined;

export const selectSwapsApprovalTransaction = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.approvalTransaction,
);
export const selectSwapsQuoteValues = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.quoteValues,
);
export const selectSwapsQuotes = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.quotes,
);
export const selectSwapsAggregatorMetadata = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.aggregatorMetadata,
);
export const selectSwapsError = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.error,
);
export const selectSwapsQuoteRefreshSeconds = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.quoteRefreshSeconds,
);
export const selectSwapsUsedGasEstimate = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.usedGasEstimate,
);
export const selectSwapsUsedCustomGas = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.usedCustomGas,
);
export const selectSwapsTopAggId = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.topAggId,
);
export const selectSwapsPollingCyclesLeft = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.pollingCyclesLeft,
);
export const selectSwapsQuotesLastFetched = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.quotesLastFetched,
);
export const selectSwapsIsInPolling = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.isInPolling,
);

const swapsControllerAndUserTokens = createSelector(
  swapsControllerTokens,
  selectTokens,
  (swapsTokens, tokens) => combineTokens([swapsTokens, tokens]),
);

const swapsControllerAndUserTokensMultichain = createDeepEqualSelector(
  swapsControllerTokens,
  selectAllTokens,
  selectSelectedInternalAccountAddress,
  (swapsTokens, allTokens, currentUserAddress) => {
    const userTokensFlat: Token[] = [];
    if (allTokens && currentUserAddress) {
      for (const chainId in allTokens) {
        const chainTokens = (allTokens as any)[chainId];
        if (!chainTokens || !chainTokens[currentUserAddress]) continue;

        const userTokensForChain = chainTokens[currentUserAddress];
        if (Array.isArray(userTokensForChain)) {
          userTokensFlat.push(...userTokensForChain);
        }
      }
    }

    return combineTokens([swapsTokens, userTokensFlat]);
  },
);

export const swapsTokensSelector = createSelector(
  chainIdSelector,
  swapsControllerAndUserTokens,
  selectTokenList,
  (chainId, tokens, tokenList) => {
    if (!tokens) {
      return [];
    }

    return addMetadata(chainId, tokens, tokenList);
  },
);

export const topAssets = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.topAssets,
);

export const selectChainCache = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.chainCache,
);

export const swapsTokensObjectSelector = createSelector(
  swapsControllerAndUserTokens,
  (tokens) => {
    if (!tokens || tokens.length === 0) {
      return {};
    }

    const result: Record<string, undefined> = {};
    for (const token of tokens) {
      result[token.address] = undefined;
    }
    return result;
  },
);

export const swapsTokensMultiChainObjectSelector = createSelector(
  swapsControllerAndUserTokensMultichain,
  (tokens) => {
    if (!tokens || tokens.length === 0) {
      return {};
    }

    const result: Record<string, undefined> = {};
    for (const token of tokens) {
      result[token.address] = undefined;
    }
    return result;
  },
);

export const swapsTokensWithBalanceSelector = createSelector(
  chainIdSelector,
  swapsControllerAndUserTokens,
  selectTokenList,
  selectContractBalances,
  (chainId, tokens, tokenList, balances) => {
    if (!tokens) {
      return [];
    }
    const baseTokens = tokens;
    const tokensAddressesWithBalance = Object.entries(balances)
      .filter(([, balance]) => (balance as any) !== 0)
      .sort(([, balanceA], [, balanceB]) => (lte(balanceB as any, balanceA as any) ? -1 : 1))
      .map(([address]) => address.toLowerCase());
    const tokensWithBalance: ProcessedToken[] = [];
    const originalTokens: ProcessedToken[] = [];

    for (let i = 0; i < baseTokens.length; i++) {
      if (tokensAddressesWithBalance.includes(baseTokens[i].address)) {
        tokensWithBalance.push(baseTokens[i]);
      } else {
        originalTokens.push(baseTokens[i]);
      }

      if (
        tokensWithBalance.length === tokensAddressesWithBalance.length &&
        tokensWithBalance.length + originalTokens.length >=
          MAX_TOKENS_WITH_BALANCE
      ) {
        break;
      }
    }

    const result = [...tokensWithBalance, ...originalTokens].slice(
      0,
      Math.max(tokensWithBalance.length, MAX_TOKENS_WITH_BALANCE),
    );
    return addMetadata(chainId, result, tokenList);
  },
);

export const swapsTopAssetsSelector = createSelector(
  chainIdSelector,
  swapsControllerAndUserTokens,
  selectTokenList,
  topAssets,
  (chainId, tokens, tokenList, topAssets) => {
    if (!topAssets || !tokens) {
      return [];
    }
    const result = (topAssets as { address: string }[])
      .map(({ address }) =>
        tokens?.find((token: ProcessedToken) => areAddressesEqual(token.address, address)),
      )
      .filter(Boolean) as ProcessedToken[];
    return addMetadata(chainId, result, tokenList);
  },
);

export const initialState: SwapsState = {
  isLive: true,
  hasOnboarded: true,
  featureFlags: undefined,
  '0x1': {
    isLive: true,
    featureFlags: undefined,
  },
};

/* eslint-disable @typescript-eslint/default-param-last */
function swapsReducer(
  state = initialState,
  action: AnyAction,
): SwapsState {
  switch (action.type) {
    case SWAPS_SET_LIVENESS: {
      const { chainId: rawChainId, featureFlags } = action.payload;
      const chainId = getFeatureFlagChainId(rawChainId);

      const data = state[chainId] as
        | { featureFlags?: unknown; isLive?: boolean }
        | undefined;

      const chainNoFlags = {
        ...data,
        featureFlags: undefined,
        isLive: false,
      };

      if (!featureFlags) {
        return {
          ...state,
          [chainId]: chainNoFlags,
          [rawChainId]: chainNoFlags,
          featureFlags: undefined,
        };
      }

      const newState: SwapsState = {
        ...state,
        featureFlags: {
          smart_transactions: (
            featureFlags as { smart_transactions?: unknown }
          )?.smart_transactions,
          smartTransactions: (featureFlags as { smartTransactions?: unknown })
            ?.smartTransactions,
        },
      };

      const noTestnetChainIdToNameMap = omit(
        CHAIN_ID_TO_NAME_MAP,
        toHex('1337'),
      );
      const chainNameToIdMap = invert(noTestnetChainIdToNameMap);

      Object.keys(featureFlags).forEach((chainName) => {
        const chainIdForName = chainNameToIdMap[chainName];

        if (
          chainIdForName &&
          (featureFlags as Record<string, unknown>)[chainName] &&
          typeof (featureFlags as Record<string, unknown>)[chainName] ===
            'object'
        ) {
          const chainFeatureFlags = (featureFlags as Record<string, unknown>)[
            chainName
          ];
          const chainLiveness = getSwapsLiveness(featureFlags, chainIdForName as `0x${string}`);

          newState[chainIdForName] = {
            ...(state[chainIdForName] as object),
            featureFlags: chainFeatureFlags,
            isLive: chainLiveness,
          };

          if (chainIdForName === chainId && rawChainId !== chainId) {
            newState[rawChainId] = newState[chainIdForName];
          }
        }
      });

      return newState;
    }
    case SWAPS_SET_HAS_ONBOARDED: {
      return {
        ...state,
        hasOnboarded: Boolean(action.payload),
      };
    }
    default: {
      return state;
    }
  }
}

export default swapsReducer;
export type { SwapsState } from './types';
