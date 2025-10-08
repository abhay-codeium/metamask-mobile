import {
  RevealSeedViewSelectorsIDs,
  RevealSeedViewSelectorsText,
} from '../../../selectors/Settings/SecurityAndPrivacy/RevealSeedView.selectors';
import { Matchers, Gestures } from '../../../framework';

class RevealSecretRecoveryPhrase {
  get container() {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_CONTAINER_ID,
    );
  }

  get passwordWarning() {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.PASSWORD_WARNING_ID,
    );
  }

  get passwordInputToRevealCredential() {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.PASSWORD_INPUT_BOX_ID,
    );
  }

  get scrollViewIdentifier() {
    return Matchers.getIdentifier(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_SCROLL_ID,
    );
  }

  get tabScrollViewTextIdentifier() {
    return Matchers.getIdentifier(
      RevealSeedViewSelectorsIDs.TAB_SCROLL_VIEW_TEXT,
    );
  }
  get tabScrollViewQRCodeIdentifier() {
    return Matchers.getIdentifier(
      RevealSeedViewSelectorsIDs.TAB_SCROLL_VIEW_QR_CODE,
    );
  }

  get revealSecretRecoveryPhraseButton() {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_BUTTON_ID,
    );
  }

  get revealCredentialCopyToClipboardButton() {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_COPY_TO_CLIPBOARD_BUTTON,
    );
  }

  get revealCredentialQRCodeTab() {
    return Matchers.getElementByText(
      RevealSeedViewSelectorsText.REVEAL_CREDENTIAL_QR_CODE_TAB_ID,
    );
  }

  get revealCredentialQRCodeImage() {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_QR_CODE_IMAGE_ID,
    );
  }

  get doneButton() {
    return Matchers.getElementByText(
      RevealSeedViewSelectorsText.REVEAL_CREDENTIAL_DONE,
    );
  }

  async enterPasswordToRevealSecretCredential(password) {
    await Gestures.typeText(
      this.passwordInputToRevealCredential,
      password,
      { hideKeyboard: true },
    );
  }

  async tapToReveal() {
    await Gestures.waitAndTap(this.revealSecretRecoveryPhraseButton);
  }

  async tapToCopyCredentialToClipboard() {
    await Gestures.tap(this.revealCredentialCopyToClipboardButton);
  }

  async tapToRevealPrivateCredentialQRCode() {
    await Gestures.tap(this.revealCredentialQRCodeTab);
  }

  async scrollToDone() {
    await Gestures.scrollToElement(this.doneButton, this.scrollViewIdentifier);
  }

  async tapDoneButton() {
    return Gestures.waitAndTap(this.doneButton);
  }

  async scrollToCopyToClipboardButton() {
    await Gestures.scrollToElement(
      this.revealCredentialCopyToClipboardButton,
      this.tabScrollViewTextIdentifier,
    );
  }

  async scrollToQR() {
    await Gestures.scrollToElement(
      this.revealCredentialQRCodeImage,
      this.tabScrollViewQRCodeIdentifier,
    );
  }
}

export default new RevealSecretRecoveryPhrase();
