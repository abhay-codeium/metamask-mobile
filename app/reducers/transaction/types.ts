import { SecurityAlertResponse } from '@metamask/transaction-controller';

export interface TransactionState {
  selectedAsset: Record<string, unknown>;
  assetType: string | undefined;
  ensRecipient: string | undefined;
  transaction: {
    data: string | undefined;
    from: string | undefined;
    gas: string | undefined;
    gasPrice: string | undefined;
    to: string | undefined;
    value: string | undefined;
    maxFeePerGas: string | undefined;
    maxPriorityFeePerGas: string | undefined;
  };
  transactionTo: string | undefined;
  transactionToName: string | undefined;
  transactionFromName: string | undefined;
  transactionValue: string | undefined;
  symbol: string | undefined;
  paymentRequest: unknown;
  readableValue: string | undefined;
  id: string | undefined;
  type: string | undefined;
  proposedNonce: string | undefined;
  nonce: string | undefined;
  securityAlertResponses: Record<string, SecurityAlertResponse>;
  warningGasPriceHigh: string | undefined;
  chainId?: string;
  origin?: string;
  error?: string;
  transactionConfirmed?: boolean;
  dappSuggestedGasEstimates?: Record<string, unknown>;
  multiLayerL1FeeTotal?: string;
  maxValueMode?: boolean;
  useMax: boolean;
}
