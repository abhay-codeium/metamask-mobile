import { RootState } from '../reducers';
import { createSelector } from 'reselect';

const selectSettings = (state: RootState) => state.settings;

export const selectShowFiatInTestnets = createSelector(
  selectSettings,
  (settingsState) => settingsState.showFiatOnTestnets,
);

export const selectPrimaryCurrency = createSelector(
  selectSettings,
  (settingsState) => settingsState.primaryCurrency,
);
export const selectShowCustomNonce = createSelector(
  selectSettings,
  (settingsState) => settingsState.showCustomNonce,
);

export const selectBasicFunctionalityEnabled = createSelector(
  selectSettings,
  (settingsState) => settingsState.basicFunctionalityEnabled,
);

export const selectHideZeroBalanceTokens = createSelector(
  selectSettings,
  (settingsState) => Boolean(settingsState.hideZeroBalanceTokens),
);

export const selectDeepLinkModalDisabled = createSelector(
  selectSettings,
  (settingsState) => Boolean(settingsState.deepLinkModalDisabled),
);
