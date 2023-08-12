import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalsAddNewFinancialDataComponent extends Component {
  @service('user') userService;
  @service('input-validation') validationService;
  @service notifications;

  @tracked isModalOpen = false;
  @tracked financeData = this.initFinanceData();

  @action
  resetEditableValues() {
    this.financeData = this.initFinanceData();
  }

  initFinanceData() {
    return {
      month: this.args.candidateMonth,
      income: null,
      spendings: null,
      initialTotalBalance: this.userService.totalBalance,
      currencyCode: this.userService.selectedCurrency.code,
      currencySymbol: this.userService.selectedCurrency.symbol,
    };
  }

  @action
  addDataForNewMonth() {
    const { income, spendings } = this.financeData;

    if (!income || !spendings) {
      this.validationService.validationWasTriggered = true; //set it to true so that Input component knows that validations found some issues

      this.notifications.error('Make sure all fields are filled!', {
        autoClear: true,
      });
      return;
    }

    this.financeData.updatedTotalBalance =
      this.userService.totalBalance + (income - spendings);

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
