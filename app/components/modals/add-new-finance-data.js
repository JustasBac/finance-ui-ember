import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class ModalsAddNewFinanceDataComponent extends Component {
  @service('user') userService;
  @service('finance') financeService;
  @service('input-validation') validationService;
  @service notifications;
  @service intl;

  @tracked isModalOpen = false;
  @tracked financeData = this.initFinanceData();
  @tracked valueInput = this.userService.initialTotalBalance; //used for input because we don't want to update the value without user confirming it

  @tracked isTotalBalanceModalOpen =
    this.financeService.financeDataList.length === 0;

  get currencySymbol() {
    return this.userService.selectedCurrency.symbol;
  }

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
      this.validationService.triggerValidation();
      return;
    }

    this.financeData.updatedTotalBalance =
      initialTotalBalance + (income - spendings);

    this.isModalOpen = false;

    this.args.onAddNewMonth(this.financeData);

    this.notifications.success(
      this.intl.t('notifications.financial-data-added', {
        month: this.financeData.month,
      }),
      {
        autoClear: true,
      }
    );
  }

  @action
  async saveInitialTotalBalance() {
    if (!this.valueInput) {
      this.validationService.triggerValidation();
      return;
    }

    await this.userService.updateUserInitialTotalBalance(+this.valueInput);

    this.isTotalBalanceModalOpen = false;
  }
}
