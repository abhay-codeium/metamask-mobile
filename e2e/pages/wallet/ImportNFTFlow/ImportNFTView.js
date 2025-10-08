import { Matchers, Gestures } from '../../../framework';
import { NFTImportScreenSelectorsIDs } from '../../../selectors/wallet/ImportNFTView.selectors';

class ImportNFTView {
  get container() {
    return Matchers.getElementByID(NFTImportScreenSelectorsIDs.CONTAINER);
  }

  get addressInput() {
    return Matchers.getElementByID(
      NFTImportScreenSelectorsIDs.ADDRESS_INPUT_BOX,
    );
  }

  get addressWarningMessage() {
    return Matchers.getElementByID(
      NFTImportScreenSelectorsIDs.ADDRESS_WARNING_MESSAGE,
    );
  }

  get identifierInput() {
    return Matchers.getElementByID(
      NFTImportScreenSelectorsIDs.IDENTIFIER_INPUT_BOX,
    );
  }

  async typeInNFTAddress(address) {
    await Gestures.typeText(this.addressInput, address, {hideKeyboard: true});
  }

  async typeInNFTIdentifier(identifier) {
    await Gestures.typeText(this.identifierInput, identifier, {hideKeyboard: true});
  }
}

export default new ImportNFTView();
