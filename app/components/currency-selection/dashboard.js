import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { action } from '@ember/object';

export default class CurrencySelectionDashboardComponent extends Component {
  @service('currency') currencyService;

  @computed('currencyService.currencies', 'searchString')
  get currencies() {
    if (this.searchString) {
      return this.currencyService.currencies.filter((currency) =>
        currency.searchableText
          .toLowerCase()
          .includes(this.searchString.toLowerCase())
      );
    }

    return this.currencyService.currencies;
  }

  @action
  selectCurrency(currency) {
    this.currencyService.selectNewCurrency(currency.code);
    if (typeof this.args.onCurrencyChange === 'function') {
      this.args.onCurrencyChange();
    }
  }
}
