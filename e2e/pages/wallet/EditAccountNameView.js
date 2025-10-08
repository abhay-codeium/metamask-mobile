import { Matchers, Gestures } from '../../framework';
import { EditAccountNameSelectorIDs } from '../../selectors/wallet/EditAccountName.selectors';

class EditAccountNameView {
  get saveButton() {
    return Matchers.getElementByID(
      EditAccountNameSelectorIDs.EDIT_ACCOUNT_NAME_SAVE,
    );
  }
  get accountNameInput() {
    return Matchers.getElementByID(
      EditAccountNameSelectorIDs.ACCOUNT_NAME_INPUT,
    );
  }

  async tapSave() {
    await Gestures.waitAndTap(this.saveButton);
  }

  async updateAccountName(accountName) {
    await Gestures.typeText(this.accountNameInput, '', {clearFirst: true});
    await Gestures.typeText(this.accountNameInput, accountName, {hideKeyboard: true});
  }
}

export default new EditAccountNameView();
