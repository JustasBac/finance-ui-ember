import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FormsFinanceDataComponent extends Component {
  @service('user') userService;
  @service('input-validation') validationService;

  @tracked selectedCurrency = this.getSelectedCurrency(); //on default take currency that is globaly selected

  getSelectedCurrency() {
    const { currencyCode } = this.args.data;

    if (!currencyCode) {
      return this.userService.selectedCurrency;
    }

    return this.userService.currencies.find(
      (currency) => currency.code === currencyCode
    );
  }

  @action
  changeCurrency(newCurrency) {
    this.args.data.currencyCode = newCurrency.code;
    this.args.data.currencySymbol = this.userService.getCurrencySymbol(
      newCurrency.code
    );
    this.selectedCurrency = newCurrency;
  }

  @action
  resetFormValidations() {
    this.validationService.validationWasTriggered = false;
  }
}
