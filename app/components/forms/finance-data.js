import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FormsFinanceDataComponent extends Component {
  @service('currency') currencyService;

  @tracked selectedCurrency = this.getSelectedCurrency(); //on default take currency that is globaly selected

  getSelectedCurrency() {
    const { currencyCode } = this.args.data;

    if (!currencyCode) {
      return this.currencyService.selectedCurrency;
    }

    return this.currencyService.currencies.find(
      (currency) => currency.code === currencyCode
    );
  }

  @action
  changeCurrency(newCurrency) {
    this.args.data.currencyCode = newCurrency.code;
    this.args.data.currencySymbol = this.currencyService.getCurrencySymbol(
      newCurrency.code
    );
    this.selectedCurrency = newCurrency;
  }
}
