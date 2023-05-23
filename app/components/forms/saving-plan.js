import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class FormsSavingPlanComponent extends Component {
  @service('currency') currencyService;

  @tracked selectedCurrency = this.getSelectedCurrency(); //on default take currency that is globaly selected

  getSelectedCurrency() {
    const { currencyCode } = this.args.savingPlanInformation;

    if (!currencyCode) {
      return this.currencyService.selectedCurrency;
    }

    return this.currencyService.currencies.find(
      (currency) => currency.code === currencyCode
    );
  }

  @action
  changeCurrency(newCurrency) {
    this.args.savingPlanInformation.currencyCode = newCurrency.code;
    this.selectedCurrency = newCurrency;
  }
}
