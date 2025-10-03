import { RootState } from '../../../../reducers';
import { StateType } from '../../../../reducers/signatureRequest';

export const selectSignatureSecurityAlertResponse = (
  rootState: RootState,
): StateType =>
  rootState.signatureRequest;
