import { Matchers, Gestures } from '../../framework';
import { SmartAccountIds } from '../../selectors/MultichainAccounts/SmartAccount.selectors';

class SmartAccount {
  get container() {
    return Matchers.getElementByID(SmartAccountIds.SMART_ACCOUNT_CONTAINER);
  }

  get smartAccountSwitch() {
    return Matchers.getElementByID(SmartAccountIds.SMART_ACCOUNT_SWITCH);
  }

  async tapSmartAccountSwitch() {
    await Gestures.waitAndTap(this.smartAccountSwitch);
  }
}

export default new SmartAccount();
