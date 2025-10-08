import { WhatsNewModalSelectorsIDs } from '../../selectors/Onboarding/WhatsNewModal.selectors';
import { Matchers, Gestures } from '../../framework';

class WhatsNewModal {
  get container() {
    return Matchers.getElementByID(WhatsNewModalSelectorsIDs.CONTAINER);
  }

  get closeButton() {
    return Matchers.getElementByID(WhatsNewModalSelectorsIDs.CLOSE_BUTTON);
  }

  async tapCloseButton() {
    await Gestures.waitAndTap(this.closeButton);
  }
}

export default new WhatsNewModal();
