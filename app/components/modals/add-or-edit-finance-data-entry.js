import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class ModalsAddOrEditFinanceDataEntryComponent extends Component {
  @service('user') userService;
  @service('finance') financeService;
  @service('requests') requestService;
  @service intl;

  @tracked isModalOpen = false;
  @tracked valueInput = this.value || null; //used for input because we don't want to update the value without user confirming it

  get currentMonthData() {
    return this.financeService.getCurrentMonthsData();
  }

  get currency() {
    if (!this.currentMonthData) {
      return {
        code: this.userService.selectedCurrency.code,
        symbol: this.userService.selectedCurrency.symbol,
      };
    }

    return {
      code: this.currentMonthData.currencyCode,
      symbol: this.userService.getCurrencySymbol(
        this.currentMonthData.currencyCode
      ),
    };
  }

  get currencyDiffersFromAppCurrency() {
    if (!this.currentMonthData) {
      return false;
    }

    return (
      this.currentMonthData.currencyCode !==
      this.userService.selectedCurrency.code
    );
  }

  get typeWithTranslation() {
    return this.intl.t(
      `home-page.edit-finance-modal.${this.args.type.split(' ').join('-')}`
    );
  }

  get month() {
    return this.currentMonthData
      ? this.currentMonthData.month
      : moment().format('MMMM YYYY');
  }

  get value() {
    const { type } = this.args;

    if (type === 'total balance') {
      return this.userService.totalBalance;
    }

    const currentMonthData = this.financeService.getCurrentMonthsData();

    if (!currentMonthData) {
      return null;
    }

    return currentMonthData[type];
  }

  @action
  async saveChanges() {
    const { type } = this.args;

    if (type === 'total balance') {
      this.userService.updateUserTotalBalance(this.valueInput);

      this.isModalOpen = false;
      return;
    }

    const currencyCode = this.currentMonthData
      ? this.currentMonthData.currencyCode
      : this.userService.selectedCurrency.code;

    const body = {
      id: this.currentMonthData?.id,
      month: this.month,
      currencyCode,
      income: this.currentMonthData?.income,
      spendings: this.currentMonthData?.spendings,
    };

    body[type] = this.valueInput;

    const response = await this.financeService.updateOrAddNewEntry(body);

    this.isModalOpen = false;

    if (!response) {
      return;
    }

    const currentMonthData = this.financeService.getCurrentMonthsData();

    currentMonthData[type] = +this.valueInput;
  }
}
