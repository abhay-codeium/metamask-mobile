/* eslint-disable @typescript-eslint/default-param-last */

export interface ModalsState {
  networkModalVisible: boolean;
  shouldNetworkSwitchPopToWallet: boolean;
  collectibleContractModalVisible: boolean;
  dappTransactionModalVisible: boolean;
  signMessageModalVisible: boolean;
  infoNetworkModalVisible: boolean;
}

interface ToggleNetworkModalAction {
  type: 'TOGGLE_NETWORK_MODAL';
  shouldNetworkSwitchPopToWallet?: boolean;
}

interface ToggleCollectibleContractModalAction {
  type: 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL';
}

interface ToggleDappTransactionModalAction {
  type: 'TOGGLE_DAPP_TRANSACTION_MODAL';
  show?: boolean;
}

interface ToggleInfoNetworkModalAction {
  type: 'TOGGLE_INFO_NETWORK_MODAL';
  show?: boolean;
}

interface ToggleSignModalAction {
  type: 'TOGGLE_SIGN_MODAL';
  show?: boolean;
}

type ModalsAction =
  | ToggleNetworkModalAction
  | ToggleCollectibleContractModalAction
  | ToggleDappTransactionModalAction
  | ToggleInfoNetworkModalAction
  | ToggleSignModalAction;

export const initialState: ModalsState = {
  networkModalVisible: false,
  shouldNetworkSwitchPopToWallet: true,
  collectibleContractModalVisible: false,
  dappTransactionModalVisible: false,
  signMessageModalVisible: false,
  infoNetworkModalVisible: false,
};

const modalsReducer = (
  state: ModalsState = initialState,
  action: ModalsAction,
): ModalsState => {
  switch (action.type) {
    case 'TOGGLE_NETWORK_MODAL':
      return {
        ...state,
        networkModalVisible: !state.networkModalVisible,
        shouldNetworkSwitchPopToWallet:
          action.shouldNetworkSwitchPopToWallet !== undefined
            ? action.shouldNetworkSwitchPopToWallet
            : true,
      };
    case 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL':
      return {
        ...state,
        collectibleContractModalVisible: !state.collectibleContractModalVisible,
      };
    case 'TOGGLE_DAPP_TRANSACTION_MODAL':
      return {
        ...state,
        dappTransactionModalVisible:
          action.show !== undefined ? action.show : !state.dappTransactionModalVisible,
      };
    case 'TOGGLE_INFO_NETWORK_MODAL':
      return {
        ...state,
        infoNetworkModalVisible:
          action.show !== undefined ? action.show : !state.infoNetworkModalVisible,
      };
    case 'TOGGLE_SIGN_MODAL':
      return {
        ...state,
        signMessageModalVisible:
          action.show !== undefined ? action.show : !state.signMessageModalVisible,
      };
    default:
      return state;
  }
};

export default modalsReducer;
