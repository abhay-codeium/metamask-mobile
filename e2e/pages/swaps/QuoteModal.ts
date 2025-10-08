import {
  QuotesModalSelectorIDs,
  QuotesModalSelectorsTexts,
} from '../../selectors/swaps/QuotesModal.selectors.js';
import { Gestures, Matchers } from '../../framework';

class QuotesModal {
  get closeButton() {
    return Matchers.getElementByID(QuotesModalSelectorIDs.QUOTES_MODAL_CLOSE);
  }

  get header() {
    return Matchers.getElementByText(QuotesModalSelectorsTexts.QUOTES_OVERVIEW);
  }

  async close() {
    await Gestures.waitAndTap(this.closeButton, {
      checkStability: true,
    });
  }
}

export default new QuotesModal();
