/* eslint-disable @typescript-eslint/default-param-last */

export interface SettingsState {
  searchEngine: string;
  primaryCurrency: string;
  lockTime: number;
  useBlockieIcon: boolean;
  hideZeroBalanceTokens: boolean;
  showCustomNonce: boolean;
  showFiatOnTestnets: boolean;
  showHexData: boolean;
  basicFunctionalityEnabled: boolean;
  deviceNotificationEnabled: boolean;
  tokenSortConfig: Record<string, unknown>;
  deepLinkModalDisabled: boolean;
}

interface SetSearchEngineAction {
  type: 'SET_SEARCH_ENGINE';
  searchEngine: string;
}

interface SetShowHexDataAction {
  type: 'SET_SHOW_HEX_DATA';
  showHexData: boolean;
}

interface SetShowCustomNonceAction {
  type: 'SET_SHOW_CUSTOM_NONCE';
  showCustomNonce: boolean;
}

interface SetShowFiatOnTestnetsAction {
  type: 'SET_SHOW_FIAT_ON_TESTNETS';
  showFiatOnTestnets: boolean;
}

interface SetHideZeroBalanceTokensAction {
  type: 'SET_HIDE_ZERO_BALANCE_TOKENS';
  hideZeroBalanceTokens: boolean;
}

interface SetLockTimeAction {
  type: 'SET_LOCK_TIME';
  lockTime: number;
}

interface SetPrimaryCurrencyAction {
  type: 'SET_PRIMARY_CURRENCY';
  primaryCurrency: string;
}

interface SetUseBlockieIconAction {
  type: 'SET_USE_BLOCKIE_ICON';
  useBlockieIcon: boolean;
}

interface ToggleBasicFunctionalityAction {
  type: 'TOGGLE_BASIC_FUNCTIONALITY';
  basicFunctionalityEnabled: boolean;
}

interface ToggleDeviceNotificationAction {
  type: 'TOGGLE_DEVICE_NOTIFICATIONS';
  deviceNotificationEnabled: boolean;
}

interface SetTokenSortConfigAction {
  type: 'SET_TOKEN_SORT_CONFIG';
  tokenSortConfig: Record<string, unknown>;
}

interface SetDeepLinkModalDisabledAction {
  type: 'SET_DEEP_LINK_MODAL_DISABLED';
  deepLinkModalDisabled: boolean;
}

type SettingsAction =
  | SetSearchEngineAction
  | SetShowHexDataAction
  | SetShowCustomNonceAction
  | SetShowFiatOnTestnetsAction
  | SetHideZeroBalanceTokensAction
  | SetLockTimeAction
  | SetPrimaryCurrencyAction
  | SetUseBlockieIconAction
  | ToggleBasicFunctionalityAction
  | ToggleDeviceNotificationAction
  | SetTokenSortConfigAction
  | SetDeepLinkModalDisabledAction;

export const initialState: SettingsState = {
  searchEngine: 'DuckDuckGo',
  primaryCurrency: 'usd',
  lockTime: 30000,
  useBlockieIcon: true,
  hideZeroBalanceTokens: false,
  showCustomNonce: false,
  showFiatOnTestnets: false,
  showHexData: false,
  basicFunctionalityEnabled: false,
  deviceNotificationEnabled: true,
  tokenSortConfig: {},
  deepLinkModalDisabled: false,
};

const settingsReducer = (
  state: SettingsState = initialState,
  action: SettingsAction,
): SettingsState => {
  switch (action.type) {
    case 'SET_SEARCH_ENGINE':
      return {
        ...state,
        searchEngine: action.searchEngine,
      };
    case 'SET_SHOW_HEX_DATA':
      return {
        ...state,
        showHexData: action.showHexData,
      };
    case 'SET_SHOW_CUSTOM_NONCE':
      return {
        ...state,
        showCustomNonce: action.showCustomNonce,
      };
    case 'SET_SHOW_FIAT_ON_TESTNETS':
      return {
        ...state,
        showFiatOnTestnets: action.showFiatOnTestnets,
      };
    case 'SET_HIDE_ZERO_BALANCE_TOKENS':
      return {
        ...state,
        hideZeroBalanceTokens: action.hideZeroBalanceTokens,
      };
    case 'SET_LOCK_TIME':
      return {
        ...state,
        lockTime: action.lockTime,
      };
    case 'SET_PRIMARY_CURRENCY':
      return {
        ...state,
        primaryCurrency: action.primaryCurrency,
      };
    case 'SET_USE_BLOCKIE_ICON':
      return {
        ...state,
        useBlockieIcon: action.useBlockieIcon,
      };
    case 'TOGGLE_BASIC_FUNCTIONALITY':
      return {
        ...state,
        basicFunctionalityEnabled: action.basicFunctionalityEnabled,
      };
    case 'TOGGLE_DEVICE_NOTIFICATIONS':
      return {
        ...state,
        deviceNotificationEnabled: action.deviceNotificationEnabled,
      };
    case 'SET_TOKEN_SORT_CONFIG':
      return {
        ...state,
        tokenSortConfig: action.tokenSortConfig,
      };
    case 'SET_DEEP_LINK_MODAL_DISABLED':
      return {
        ...state,
        deepLinkModalDisabled: action.deepLinkModalDisabled,
      };
    default:
      return state;
  }
};

export default settingsReducer;
