import { NftDetectionModalSelectorsIDs } from '../../selectors/wallet/NftDetectionModal.selectors';
import { Matchers, Gestures } from '../../framework';

class NftDetectionModal {
  get container() {
    return Matchers.getElementByID(NftDetectionModalSelectorsIDs.CONTAINER);
  }

  get cancelButton() {
    return Matchers.getElementByID(NftDetectionModalSelectorsIDs.CANCEL_BUTTON);
  }

  get allowButton() {
    return Matchers.getElementByID(NftDetectionModalSelectorsIDs.ALLOW_BUTTON);
  }

  async tapCancelButton() {
    await Gestures.waitAndTap(this.cancelButton);
  }

  async tapAllowButton() {
    await Gestures.waitAndTap(this.allowButton);
  }
}

export default new NftDetectionModal();
