/**
 * Settings reducer state
 */
export interface SettingsState {
  searchEngine: string;
  primaryCurrency: string;
  lockTime: number;
  useBlockieIcon: boolean;
  hideZeroBalanceTokens: boolean;
  basicFunctionalityEnabled: boolean;
  deepLinkModalDisabled: boolean;
  showHexData?: boolean;
  showCustomNonce?: boolean;
  showFiatOnTestnets?: boolean;
  deviceNotificationEnabled?: boolean;
  [key: string]: unknown;
}

/**
 * Initial state for settings reducer
 */
export const settingsInitialState: SettingsState = {
  searchEngine: 'DuckDuckGo',
  primaryCurrency: 'usd',
  lockTime: -1,
  useBlockieIcon: true,
  hideZeroBalanceTokens: false,
  basicFunctionalityEnabled: true,
  deepLinkModalDisabled: false,
};
