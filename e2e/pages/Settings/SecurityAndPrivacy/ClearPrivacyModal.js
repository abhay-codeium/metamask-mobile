import {
  ClearPrivacyModalSelectorsIDs,
  ClearPrivacyModalSelectorsText,
} from '../../../selectors/Settings/SecurityAndPrivacy/ClearPrivacyModal.selectors';
import { Matchers, Gestures } from '../../../framework';

class ClearPrivacyModal {
  get container() {
    return Matchers.getElementByID(ClearPrivacyModalSelectorsIDs.CONTAINER);
  }

  get clearButton() {
    return Matchers.getElementByText(
      ClearPrivacyModalSelectorsText.CLEAR_BUTTON,
    );
  }
  get cancelButton() {
    return Matchers.getElementByText(
      ClearPrivacyModalSelectorsText.CANCEL_BUTTON,
    );
  }

  async tapClearButton() {
    await Gestures.waitAndTap(this.clearButton);
  }
}

export default new ClearPrivacyModal();
