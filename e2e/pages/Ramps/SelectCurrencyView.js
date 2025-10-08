import { Matchers, Gestures } from '../../framework';

class SelectCurrencyView {
  async tapCurrencyOption(currency) {
    const currencyOption = Matchers.getElementByText(currency);
    await Gestures.waitAndTap(currencyOption);
  }
}

export default new SelectCurrencyView();
