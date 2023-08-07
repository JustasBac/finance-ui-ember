import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalsAddNewFinancialDataComponent extends Component {
  @service('currency') currencyService;
  @service('input-validation') validationService;
  @service notifications;

  @tracked isModalOpen = false;
  @tracked financeData = {
    month: this.args.candidateMonth,
    income: null,
    spendings: null,
    totalBalance: null,
    currencyCode: this.currencyService.selectedCurrency.code,
    currencySymbol: this.currencyService.selectedCurrency.symbol,
  };

  @action
  resetEditableValues() {
    this.financeData = {
      month: this.args.candidateMonth,
      income: null,
      spendings: null,
      totalBalance: null,
      currencyCode: this.currencyService.selectedCurrency.code,
      currencySymbol: this.currencyService.selectedCurrency.symbol,
    };
  }

  @action
  addDataForNewMonth() {
    const { income, spendings, totalBalance } = this.financeData;

    if (!income || !spendings || !totalBalance) {
      this.validationService.validationWasTriggered = true; //set it to true so that Input component knows that validations found some issues

      this.notifications.error('Make sure all fields are filled!', {
        autoClear: true,
      });
      return;
    }

    this.isModalOpen = false;

    this.args.onAddNewMonth(this.financeData);

    this.notifications.success(
      `Financial data for ${this.financeData.month} was added`,
      {
        autoClear: true,
      }
    );
  }
}
