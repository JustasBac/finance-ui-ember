import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class ModalsAddOrEditInitialTotalBalanceComponent extends Component {
  @service('user') userService;
  @service('finance') financeService;
  @service('requests') requestService;
  @service intl;

  @tracked isModalOpen = false;
  @tracked valueInput = this.userService.initialTotalBalance || null; //used for input because we don't want to update the value without user confirming it

  get currency() {
    return {
      code: this.userService.selectedCurrency.code,
      symbol: this.userService.selectedCurrency.symbol,
    };
  }

  get month() {
    if (this.financeService.financeDataList.length) {
      return moment(this.financeService.financeDataList[0].datetime).format(
        'MMMM YYYY'
      );
    }

    return moment().format('MMMM YYYY');
  }

  @action
  async saveChanges() {
    this.userService.updateUserInitialTotalBalance(this.valueInput);

    this.isModalOpen = false;
  }
}
