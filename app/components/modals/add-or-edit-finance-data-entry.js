import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class ModalsAddOrEditFinanceDataEntryComponent extends Component {
  @service('currency') currencyService;
  @service('economy') economyService;

  @tracked isModalOpen = false;
  @tracked valueInput = this.value || null; //used for input because we don't want to update the value without user confirming it

  @tracked currentMonthData = this.economyService.getCurrentMonthsData();

  get currencySymbol() {
    if (!this.currentMonthData) {
      return this.currencyService.selectedCurrency.symbol;
    }

    return this.currencyService.getCurrencySymbol(
      this.currentMonthData.currencyCode
    );
  }

  get month() {
    return this.currentMonthData
      ? this.currentMonthData.month
      : moment().format('MMMM YYYY');
  }

  get value() {
    if (!this.currentMonthData) {
      return null;
    }

    const { type } = this.args;

    return this.currentMonthData[
      type === 'total balance' ? 'totalBalance' : type
    ];
  }

  @action
  async saveChanges() {
    const type =
      this.args.type === 'total balance' ? 'totalBalance' : this.args.type;

    const currencyCode = this.currentMonthData
      ? this.currentMonthData.currencyCode
      : this.currencyService.selectedCurrency.code;

    const body = {
      id: this.currentMonthData?.id,
      month: this.month,
      currencyCode,
      income: this.currentMonthData?.income,
      spendings: this.currentMonthData?.spendings,
      totalBalance: this.currentMonthData?.totalBalance,
    };

    body[type] = this.valueInput;

    const response = await this.economyService.updateOrAddNewEntry(body);

    this.isModalOpen = false;

    if (!response) {
      return;
    }

    if (!this.currentMonthData) {
      this.currentMonthData = this.economyService.getCurrentMonthsData();
      return;
    }

    this.currentMonthData[type] = +this.valueInput;
  }
}
