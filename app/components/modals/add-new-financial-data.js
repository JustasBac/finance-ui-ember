import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ModalsAddNewFinancialDataComponent extends Component {
  @service('user') userService;
  @service('finance') financeService;
  @service('input-validation') validationService;
  @service notifications;

  @tracked isModalOpen = false;
  @tracked financeData = this.initFinanceData();

  @action
  resetEditableValues() {
    this.financeData = this.initFinanceData();
  }

  initFinanceData() {
    let initialTotalBalance = this.userService.initialTotalBalance;

    if (this.financeService.financeDataList.length) {
      const previousMonth = moment(this.args.candidateDatetime)
        .subtract(1, 'month')
        .format('MMMM YYYY');

      const previousMonthData = this.financeService.financeDataList.find(
        (el) => moment(el.datetime).format('MMMM YYYY') === previousMonth
      );
      initialTotalBalance = previousMonthData.updatedTotalBalance;
    }

    return {
      datetime: this.args.candidateDatetime,
      income: null,
      spendings: null,
      initialTotalBalance,
      currencyCode: this.userService.selectedCurrency.code,
      currencySymbol: this.userService.selectedCurrency.symbol,
    };
  }

  @action
  addDataForNewMonth() {
    const { income, spendings, initialTotalBalance } = this.financeData;

    if (!income || !spendings) {
      this.validationService.validationWasTriggered = true; //set it to true so that Input component knows that validations found some issues

      this.notifications.error('Make sure all fields are filled!', {
        autoClear: true,
      });
      return;
    }

    this.financeData.updatedTotalBalance =
      initialTotalBalance + (income - spendings);

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
