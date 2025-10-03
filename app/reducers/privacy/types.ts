/**
 * Privacy reducer state
 */
export interface PrivacyState {
  /**
   * Record of hostnames that have been approved for privacy-related actions
   */
  approvedHosts: Record<string, boolean>;
  /**
   * Timestamps when Secret Recovery Phrase was revealed
   */
  revealSRPTimestamps: number[];
}

/**
 * Initial state for privacy reducer
 */
export const privacyInitialState: PrivacyState = {
  approvedHosts: {},
  revealSRPTimestamps: [],
};
