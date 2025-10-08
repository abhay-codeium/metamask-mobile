import { Matchers, Gestures } from '../../framework';
import { selectTokenSelectors } from '../../selectors/Ramps/SelectToken.selectors';

class TokenSelectBottomSheet {
  get tokenSearchInput() {
    return Matchers.getElementByID(
      selectTokenSelectors.TOKEN_SELECT_MODAL_SEARCH_INPUT,
    );
  }

  async tapTokenByName(token) {
    await Gestures.typeText(this.tokenSearchInput, token, {hideKeyboard: true});
    const tokenName = await Matchers.getElementByText(token, 1);
    await Gestures.waitAndTap(tokenName);
  }
}

export default new TokenSelectBottomSheet();
