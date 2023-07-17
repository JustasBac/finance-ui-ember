import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalsAddOrEditMonthlyTotalSavingsComponent extends Component {
  @service('currency') currencyService;

  @tracked isModalOpen = false;
  @tracked totalBalance = this.getLatestTotalBalance();
  @tracked editedTotalBalance = this.totalBalance; //used for input because we don't want to update the value without user confirming it

  currency = '';

  getLatestTotalBalance() {
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
    this.totalBalance = this.editedTotalBalance;

    this.args.onChange(+this.editedTotalBalance);

    this.isModalOpen = false;
  }
}
