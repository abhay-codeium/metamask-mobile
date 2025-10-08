import { ExperienceEnhancerBottomSheetSelectorsIDs } from '../../selectors/Onboarding/ExperienceEnhancerModal.selectors';
import { Gestures, Matchers } from '../../framework';

class ExperienceEnhancerBottomSheet {
  get container() {
    return Matchers.getElementByID(
      ExperienceEnhancerBottomSheetSelectorsIDs.BOTTOM_SHEET,
    );
  }

  get iAgree() {
    return Matchers.getElementByID(
      ExperienceEnhancerBottomSheetSelectorsIDs.ACCEPT_BUTTON,
    );
  }

  async tapIAgree() {
    await Gestures.waitAndTap(this.iAgree);
  }
}

export default new ExperienceEnhancerBottomSheet();
