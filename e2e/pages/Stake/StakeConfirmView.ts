import { Gestures, Matchers } from '../../framework';
import { StakeConfirmViewSelectors } from '../../selectors/Stake/StakeConfirmView.selectors.js';

class StakeConfirmationView {
  get confirmButton(): DetoxElement {
    return Matchers.getElementByText(StakeConfirmViewSelectors.CONFIRM);
  }

  async tapConfirmButton() {
    await Gestures.waitAndTap(this.confirmButton);
  }
}

export default new StakeConfirmationView();
