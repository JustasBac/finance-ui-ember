import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class ModalsAddOrEditMonthlyTotalSavingsComponent extends Component {
  @service('currency') currencyService;
  @service('economy') economyService;

  @tracked isModalOpen = false;
  @tracked totalBalance = this.economyService.getCurrentMonthsData(
    this.args.data
  ); //shown on button
  @tracked editedTotalBalance = this.totalBalance || null; //used for input because we don't want to update the value without user confirming it

  currency = '';
  //TODOO: CURRENCY
  get currentMonth() {
    return moment().format('MMMM YYYY');
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
