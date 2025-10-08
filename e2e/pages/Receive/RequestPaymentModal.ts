import { RequestPaymentModalSelectorsIDs } from '../../selectors/Receive/RequestPaymentModal.selectors';
import { Matchers, Gestures } from '../../framework';

class RequestPaymentModal {
  get requestPaymentButton(): DetoxElement {
    return device.getPlatform() === 'android'
      ? Matchers.getElementByLabel(
          RequestPaymentModalSelectorsIDs.REQUEST_BUTTON,
        )
      : Matchers.getElementByID(RequestPaymentModalSelectorsIDs.REQUEST_BUTTON);
  }

  async tapRequestPaymentButton(): Promise<void> {
    await Gestures.waitAndTap(this.requestPaymentButton);
  }
}

export default new RequestPaymentModal();
