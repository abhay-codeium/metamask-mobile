import { Matchers, Gestures } from '../../framework';
import { EditAccountNameIds } from '../../selectors/MultichainAccounts/EditAccountName.selectors';

class EditAccountName {
  get container() {
    return Matchers.getElementByID(
      EditAccountNameIds.EDIT_ACCOUNT_NAME_CONTAINER,
    );
  }

  get accountNameInput() {
    return Matchers.getElementByID(
      EditAccountNameIds.ACCOUNT_NAME_INPUT,
    ) as Promise<Detox.IndexableNativeElement>;
  }

  get saveButton() {
    return Matchers.getElementByID(EditAccountNameIds.SAVE_BUTTON);
  }

  async updateAccountName(newName: string) {
    await Gestures.typeText(this.accountNameInput, '', {clearFirst: true});
    await Gestures.typeText(this.accountNameInput, newName, {hideKeyboard: true});
  }

  async tapSave() {
    await Gestures.waitAndTap(this.saveButton);
  }
}

export default new EditAccountName();
