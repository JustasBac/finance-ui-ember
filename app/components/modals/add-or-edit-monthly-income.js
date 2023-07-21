import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class ModalsAddOrEditMonthlyIncomeComponent extends Component {
  @service('currency') currencyService;

  @tracked isModalOpen = false;
  @tracked monthIncome = this.getCurrentIncome(); //make copy so we don't update the intitial value if not saved
  @tracked editedMonthIncome = this.monthIncome || null; //used for input because we don't want to update the value without user confirming it

  get currentMonth() {
    return moment().format('MMMM YYYY');
  }

  getCurrentIncome() {
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
    this.monthIncome = this.editedMonthIncome;
    this.args.onChange(+this.editedMonthIncome);

    this.isModalOpen = false;
  }
}
