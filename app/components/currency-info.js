import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CurrencyInfoComponent extends Component {
  @service('currency') currencyService;

  get currencySymbol() {
    return this.currencyService.getCurrencySymbol(this.args.currencyCode);
  }

  get currencyDiffersFromAppCurrency() {
    return (
      this.args.currencyCode !== this.currencyService.selectedCurrency.code
    );
  }
}
