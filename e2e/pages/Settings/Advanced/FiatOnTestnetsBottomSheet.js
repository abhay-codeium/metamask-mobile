import { FiatOnTestnetsBottomSheetSelectorsIDs } from '../../../selectors/Settings/Advanced/FiatOnTestnetsBottomSheet.selectors';
import { Gestures, Matchers } from '../../../framework';

class FiatOnTestnetsBottomSheet {
  get continueButton() {
    return Matchers.getElementByID(
      FiatOnTestnetsBottomSheetSelectorsIDs.CONTINUE_BUTTON,
    );
  }

  async tapContinueButton() {
    await Gestures.waitAndTap(this.continueButton);
  }
}

export default new FiatOnTestnetsBottomSheet();
