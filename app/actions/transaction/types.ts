import { Action } from 'redux';
import type BN from 'bn.js';
import type { SecurityAlertResponse } from '../../components/Views/confirmations/legacy/components/BlockaidBanner/BlockaidBanner.types';

export enum TransactionActionType {
  RESET_TRANSACTION = 'RESET_TRANSACTION',
  NEW_ASSET_TRANSACTION = 'NEW_ASSET_TRANSACTION',
  SET_NONCE = 'SET_NONCE',
  SET_PROPOSED_NONCE = 'SET_PROPOSED_NONCE',
  SET_RECIPIENT = 'SET_RECIPIENT',
  SET_SELECTED_ASSET = 'SET_SELECTED_ASSET',
  PREPARE_TRANSACTION = 'PREPARE_TRANSACTION',
  SET_TRANSACTION_OBJECT = 'SET_TRANSACTION_OBJECT',
  SET_TOKENS_TRANSACTION = 'SET_TOKENS_TRANSACTION',
  SET_ETHER_TRANSACTION = 'SET_ETHER_TRANSACTION',
  SET_TRANSACTION_SECURITY_ALERT_RESPONSE = 'SET_TRANSACTION_SECURITY_ALERT_RESPONSE',
  SET_TRANSACTION_ID = 'SET_TRANSACTION_ID',
  SET_MAX_VALUE_MODE = 'SET_MAX_VALUE_MODE',
  SET_TRANSACTION_VALUE = 'SET_TRANSACTION_VALUE',
}

export type ResetTransactionAction =
  Action<TransactionActionType.RESET_TRANSACTION>;

export interface NewAssetTransactionAction
  extends Action<TransactionActionType.NEW_ASSET_TRANSACTION> {
  selectedAsset: {
    tokenId?: string;
    isETH?: boolean;
    symbol?: string;
    [key: string]: unknown;
  };
  assetType: 'ETH' | 'ERC20' | 'ERC721';
}

export interface SetNonceAction
  extends Action<TransactionActionType.SET_NONCE> {
  nonce: string;
}

export interface SetProposedNonceAction
  extends Action<TransactionActionType.SET_PROPOSED_NONCE> {
  proposedNonce: string;
}

export interface SetRecipientAction
  extends Action<TransactionActionType.SET_RECIPIENT> {
  from: string;
  to: string;
  ensRecipient?: string;
  transactionToName?: string;
  transactionFromName?: string;
}

export interface SetSelectedAssetAction
  extends Action<TransactionActionType.SET_SELECTED_ASSET> {
  selectedAsset: {
    tokenId?: string;
    isETH?: boolean;
    symbol?: string;
    [key: string]: unknown;
  };
  assetType?: 'ETH' | 'ERC20' | 'ERC721';
}

export interface PrepareTransactionAction
  extends Action<TransactionActionType.PREPARE_TRANSACTION> {
  transaction: {
    data?: string;
    from?: string;
    gas?: string | BN;
    gasPrice?: string | BN;
    to?: string;
    value?: string | BN;
    maxFeePerGas?: string | BN;
    maxPriorityFeePerGas?: string | BN;
  };
}

export interface SetTransactionObjectAction
  extends Action<TransactionActionType.SET_TRANSACTION_OBJECT> {
  transaction: {
    selectedAsset?: {
      tokenId?: string;
      isETH?: boolean;
      symbol?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

export interface SetTokensTransactionAction
  extends Action<TransactionActionType.SET_TOKENS_TRANSACTION> {
  asset: {
    tokenId?: string;
    isETH?: boolean;
    symbol?: string;
    [key: string]: unknown;
  };
}

export interface SetEtherTransactionAction
  extends Action<TransactionActionType.SET_ETHER_TRANSACTION> {
  transaction: {
    [key: string]: unknown;
  };
}

export interface SetTransactionSecurityAlertResponseAction
  extends Action<TransactionActionType.SET_TRANSACTION_SECURITY_ALERT_RESPONSE> {
  transactionId: string;
  securityAlertResponse: SecurityAlertResponse;
}

export interface SetTransactionIdAction
  extends Action<TransactionActionType.SET_TRANSACTION_ID> {
  transactionId: string;
}

export interface SetMaxValueModeAction
  extends Action<TransactionActionType.SET_MAX_VALUE_MODE> {
  maxValueMode: boolean;
}

export interface SetTransactionValueAction
  extends Action<TransactionActionType.SET_TRANSACTION_VALUE> {
  value: string;
}

export type TransactionAction =
  | ResetTransactionAction
  | NewAssetTransactionAction
  | SetNonceAction
  | SetProposedNonceAction
  | SetRecipientAction
  | SetSelectedAssetAction
  | PrepareTransactionAction
  | SetTransactionObjectAction
  | SetTokensTransactionAction
  | SetEtherTransactionAction
  | SetTransactionSecurityAlertResponseAction
  | SetTransactionIdAction
  | SetMaxValueModeAction
  | SetTransactionValueAction;

export interface TransactionState {
  ensRecipient?: string;
  assetType?: 'ETH' | 'ERC20' | 'ERC721';
  selectedAsset: {
    tokenId?: string;
    isETH?: boolean;
    symbol?: string;
    chainId?: string;
    address?: string;
    [key: string]: unknown;
  };
  transaction: {
    data?: string;
    from?: string;
    gas?: string | BN;
    gasPrice?: string | BN;
    to?: string;
    value?: string | BN;
    maxFeePerGas?: string | BN;
    maxPriorityFeePerGas?: string | BN;
    securityAlertResponse?: SecurityAlertResponse;
  };
  warningGasPriceHigh?: boolean;
  transactionTo?: string;
  transactionToName?: string;
  transactionFromName?: string;
  transactionValue?: string;
  symbol?: string;
  paymentRequest?: unknown;
  readableValue?: string;
  id?: string;
  type?: string;
  proposedNonce?: string;
  nonce?: string;
  securityAlertResponses: Record<string, SecurityAlertResponse>;
  useMax: boolean;
  maxValueMode?: boolean;
}
