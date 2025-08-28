import { NavigationProp, ParamListBase } from '@react-navigation/native';

export interface MainProps {
  /**
   * Object that represents the navigator
   */
  navigation: NavigationProp<ParamListBase>;
  /**
   * Dispatch showing a transaction notification
   */
  showTransactionNotification: (args: unknown) => void;
  /**
   * Dispatch showing a simple notification
   */
  showSimpleNotification: (args: unknown) => void;
  /**
   * Dispatch hiding a transaction notification
   */
  hideCurrentNotification: () => void;
  removeNotificationById: (id: string) => void;
  /**
   * Indicates whether networks allows incoming transactions
   */
  showIncomingTransactionsNetworks: Record<string, boolean>;
  /**
   * Network provider type
   */
  providerType: string;
  /**
   * Dispatch infura availability blocked
   */
  setInfuraAvailabilityBlocked: () => void;
  /**
   * Dispatch infura availability not blocked
   */
  setInfuraAvailabilityNotBlocked: () => void;
  /**
   * Remove not visible notifications from state
   */
  removeNotVisibleNotifications: () => void;
  /**
   * Current chain id
   */
  chainId: `0x${string}`;
  /**
   * backup seed phrase modal visible
   */
  backUpSeedphraseVisible: boolean;
  /**
   * ID of the global network client
   */
  networkClientId: string;
  /**
   * Network configurations
   */
  networkConfigurations: Record<string, unknown>;
}
