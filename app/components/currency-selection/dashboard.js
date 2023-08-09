import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { action } from '@ember/object';

export default class CurrencySelectionDashboardComponent extends Component {
  @service('user') userService;

  @computed('userService.currencies', 'searchString')
  get currencies() {
    if (this.searchString) {
      return this.userService.currencies.filter((currency) =>
        currency.searchableText
          .toLowerCase()
          .includes(this.searchString.toLowerCase())
      );
    }

    return this.userService.currencies;
  }

  @action
  selectCurrency(currency) {
    this.userService.selectNewCurrency(currency.code);
    if (typeof this.args.onCurrencyChange === 'function') {
      this.args.onCurrencyChange();
    }
  }
}
