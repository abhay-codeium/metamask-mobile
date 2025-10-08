import { SendActionViewSelectorsIDs } from '../../selectors/SendFlow/SendActionView.selectors';
import { Gestures, Matchers } from '../../framework';

class SendActionBottomSheet {
  get solanaAddressInputField() {
    return Matchers.getElementByID(
      SendActionViewSelectorsIDs.SOLANA_INPUT_ADDRESS_FIELD,
    );
  }

  get solanaAmountInputField() {
    return Matchers.getElementByID(
      SendActionViewSelectorsIDs.SOLANA_INPUT_AMOUNT_FIELD,
    );
  }

  get invalidAddressError() {
    return Matchers.getElementByID(
      SendActionViewSelectorsIDs.INVALID_ADDRESS_ERROR,
    );
  }

  get continueButton() {
    return Matchers.getElementByID(SendActionViewSelectorsIDs.CONTINUE_BUTTON);
  }

  get cancelButton() {
    return Matchers.getElementByID(SendActionViewSelectorsIDs.CANCEL_BUTTON);
  }

  get closeModalButton() {
    return Matchers.getElementByID(SendActionViewSelectorsIDs.CLOSE_BUTTON);
  }

  get sendSOLTransactionButton() {
    return Matchers.getElementByID(
      SendActionViewSelectorsIDs.SEND_TRANSACTION_BUTTON,
    );
  }

  async sendActionInputAddress(address) {
    await Gestures.typeText(
      this.solanaAddressInputField,
      address,
      { hideKeyboard: true },
    );
  }

  async sendActionInputAmount(amount) {
    await Gestures.typeText(this.solanaAmountInputField, amount, {
      hideKeyboard: true,
    });
  }

  async tapSendSOLTransactionButton() {
    await Gestures.waitAndTap(this.sendSOLTransactionButton);
  }

  async tapCancelButton() {
    await Gestures.waitAndTap(this.cancelButton);
  }

  async tapContinueButton() {
    await Gestures.waitAndTap(this.continueButton, {
      skipVisibilityCheck: true,
    });
  }

  async tapCloseButton() {
    await Gestures.waitAndTap(this.closeModalButton);
  }
}

export default new SendActionBottomSheet();
