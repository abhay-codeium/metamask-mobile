/* eslint-disable @typescript-eslint/default-param-last */

export interface PrivacyState {
  approvedHosts: Record<string, boolean>;
  revealSRPTimestamps: number[];
}

interface ApproveHostAction {
  type: 'APPROVE_HOST';
  hostname: string;
}

interface RejectHostAction {
  type: 'REJECT_HOST';
  hostname: string;
}

interface RecordSRPRevealTimestampAction {
  type: 'RECORD_SRP_REVEAL_TIMESTAMP';
  timestamp: number;
}

type PrivacyAction =
  | ApproveHostAction
  | RejectHostAction
  | RecordSRPRevealTimestampAction;

export const initialState: PrivacyState = {
  approvedHosts: {},
  revealSRPTimestamps: [],
};

const privacyReducer = (
  state: PrivacyState = initialState,
  action: PrivacyAction,
): PrivacyState => {
  switch (action.type) {
    case 'APPROVE_HOST': {
      const approvedHosts = { ...state.approvedHosts };
      approvedHosts[action.hostname] = true;
      return {
        ...state,
        approvedHosts,
      };
    }
    case 'REJECT_HOST': {
      const approvedHosts = { ...state.approvedHosts };
      delete approvedHosts[action.hostname];
      return {
        ...state,
        approvedHosts,
      };
    }
    case 'RECORD_SRP_REVEAL_TIMESTAMP': {
      return {
        ...state,
        revealSRPTimestamps: [...state.revealSRPTimestamps, action.timestamp],
      };
    }
    default:
      return state;
  }
};

export default privacyReducer;
