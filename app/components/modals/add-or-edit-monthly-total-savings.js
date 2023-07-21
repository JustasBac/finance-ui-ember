import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class ModalsAddOrEditMonthlyTotalSavingsComponent extends Component {
  @service('currency') currencyService;

  @tracked isModalOpen = false;
  @tracked totalBalance = this.getCurrentTotalBalance(); //shown on button
  @tracked editedTotalBalance = this.totalBalance || null; //used for input because we don't want to update the value without user confirming it

  currency = '';

  get currentMonth() {
    return moment().format('MMMM YYYY');
  }

  getCurrentTotalBalance() {
    const { data } = this.args;

    const currentMonthData = data.find((el) => el.date === this.currentMonth);

    if (!currentMonthData) {
      this.currency = this.currencyService.selectedCurrency.symbol;
      return null;
    }

    this.currency = this.currencyService.getCurrencySymbol(
      currentMonthData.currencyCode
    );

    return currentMonthData.value;
  }

  @action
  saveChanges() {
    this.totalBalance = this.editedTotalBalance;

    this.args.onChange({
      date: this.currentMonth,
      value: +this.editedTotalBalance,
    });

    this.isModalOpen = false;
  }
}
