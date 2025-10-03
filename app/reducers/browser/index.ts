/* eslint-disable @typescript-eslint/default-param-last */

export interface BrowserTab {
  id: string;
  url: string;
  image?: string;
}

export interface BrowserHistoryEntry {
  url: string;
  name?: string;
}

export interface BrowserFavicon {
  origin: string;
  url: string;
}

export interface BrowserState {
  history: BrowserHistoryEntry[];
  whitelist: string[];
  tabs: BrowserTab[];
  favicons: BrowserFavicon[];
  activeTab: number | null;
  visitedDappsByHostname: Record<string, boolean>;
}

interface AddToBrowserHistoryAction {
  type: 'ADD_TO_BROWSER_HISTORY';
  url: string;
  name?: string;
}

interface AddToBrowserWhitelistAction {
  type: 'ADD_TO_BROWSER_WHITELIST';
  hostname: string;
}

interface ClearBrowserHistoryAction {
  type: 'CLEAR_BROWSER_HISTORY';
}

interface CloseAllTabsAction {
  type: 'CLOSE_ALL_TABS';
}

interface CloseTabAction {
  type: 'CLOSE_TAB';
  id: string;
}

interface CreateNewTabAction {
  type: 'CREATE_NEW_TAB';
  url: string;
  id: string;
}

interface SetActiveTabAction {
  type: 'SET_ACTIVE_TAB';
  id: string;
}

interface UpdateTabAction {
  type: 'UPDATE_TAB';
  id: string;
  url: string;
  image?: string;
}

interface VisitedDappByHostnameAction {
  type: 'VISITED_DAPP_BY_HOSTNAME';
  hostname: string;
}

type BrowserAction =
  | AddToBrowserHistoryAction
  | AddToBrowserWhitelistAction
  | ClearBrowserHistoryAction
  | CloseAllTabsAction
  | CloseTabAction
  | CreateNewTabAction
  | SetActiveTabAction
  | UpdateTabAction
  | VisitedDappByHostnameAction;

export const initialState: BrowserState = {
  history: [],
  whitelist: [],
  tabs: [],
  favicons: [],
  activeTab: null,
  visitedDappsByHostname: {},
};

const browserReducer = (
  state: BrowserState = initialState,
  action: BrowserAction,
): BrowserState => {
  switch (action.type) {
    case 'ADD_TO_BROWSER_HISTORY':
      return {
        ...state,
        history: [
          ...state.history,
          {
            url: action.url,
            name: action.name,
          },
        ],
      };
    case 'ADD_TO_BROWSER_WHITELIST':
      return {
        ...state,
        whitelist: [...state.whitelist, action.hostname],
      };
    case 'CLEAR_BROWSER_HISTORY':
      return {
        ...state,
        history: [],
      };
    case 'CLOSE_ALL_TABS':
      return {
        ...state,
        tabs: [],
        activeTab: null,
      };
    case 'CLOSE_TAB': {
      const tabs = state.tabs.filter((tab) => tab.id !== action.id);
      const activeTab =
        state.activeTab !== null && state.tabs[state.activeTab]?.id === action.id
          ? null
          : state.activeTab;
      return {
        ...state,
        tabs,
        activeTab,
      };
    }
    case 'CREATE_NEW_TAB': {
      const newTab = {
        url: action.url,
        id: action.id,
      };
      return {
        ...state,
        tabs: [...state.tabs, newTab],
        activeTab: state.tabs.length,
      };
    }
    case 'SET_ACTIVE_TAB': {
      const activeTab = state.tabs.findIndex((tab) => tab.id === action.id);
      return {
        ...state,
        activeTab,
      };
    }
    case 'UPDATE_TAB': {
      const tabs = state.tabs.map((tab) => {
        if (tab.id === action.id) {
          return {
            ...tab,
            url: action.url,
            image: action.image,
          };
        }
        return tab;
      });
      return {
        ...state,
        tabs,
      };
    }
    case 'VISITED_DAPP_BY_HOSTNAME': {
      return {
        ...state,
        visitedDappsByHostname: {
          ...state.visitedDappsByHostname,
          [action.hostname]: true,
        },
      };
    }
    default:
      return state;
  }
};

export default browserReducer;
