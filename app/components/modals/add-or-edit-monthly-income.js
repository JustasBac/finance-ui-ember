import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalsAddOrEditMonthlyIncomeComponent extends Component {
  @service('currency') currencyService;

  @tracked isModalOpen = false;
  @tracked monthIncome = this.getLatestIncome(); //make copy so we don't update the intitial value if not saved
  @tracked editedMonthIncome = this.monthIncome; //used for input because we don't want to update the value without user confirming it

  currency = '';

  getLatestIncome() {
    const { data } = this.args;
    const latestMonthInfo = data[data.length - 1];

    if (!latestMonthInfo) {
      return 0;
    }

    this.currency = this.currencyService.getCurrencySymbol(
      latestMonthInfo.currencyCode
    );

    return latestMonthInfo.value;
  }

  @action
  saveChanges() {
    this.monthIncome = this.editedMonthIncome;
    this.args.onChange(+this.editedMonthIncome);

    this.isModalOpen = false;
  }
}
