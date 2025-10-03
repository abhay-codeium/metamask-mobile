/**
 * Browser history entry
 */
export interface BrowserHistoryEntry {
  url: string;
  name: string;
}

/**
 * Browser tab state
 */
export interface BrowserTabState {
  url: string;
  id: number;
  linkType?: string;
}

/**
 * Favicon entry
 */
export interface BrowserFavicon {
  origin: string;
  url: string;
}

/**
 * Browser reducer state
 */
export interface BrowserState {
  history: BrowserHistoryEntry[];
  whitelist: string[];
  tabs: BrowserTabState[];
  favicons: BrowserFavicon[];
  activeTab: number | null;
  /**
   * Keep track of viewed Dapps, which is used for MetaMetricsEvents.DAPP_VIEWED event
   */
  visitedDappsByHostname: Record<string, boolean>;
}

/**
 * Initial state for browser reducer
 */
export const browserInitialState: BrowserState = {
  history: [],
  whitelist: [],
  tabs: [],
  favicons: [],
  activeTab: null,
  visitedDappsByHostname: {},
};
