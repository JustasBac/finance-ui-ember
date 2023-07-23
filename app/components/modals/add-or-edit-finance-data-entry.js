import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';

export default class ModalsAddOrEditFinanceDataEntryComponent extends Component {
  @service('currency') currencyService;
  @service('economy') economyService;

  @tracked isModalOpen = false;

  @tracked currentMonthValue = this.economyService.getCurrentMonthsData(
    this.args.data
  )?.value; //shown on button
  @tracked editedCurrentMonthValue = this.currentMonthValue || null; //used for input because we don't want to update the value without user confirming it

  get currency() {
    const currentMonthData = this.economyService.getCurrentMonthsData(
      this.args.data
    );

    if (!currentMonthData) {
      return this.currencyService.selectedCurrency.symbol;
    }

    return this.currencyService.getCurrencySymbol(
      currentMonthData.currencyCode
    );
  }

  get currentMonth() {
    return moment().format('MMMM YYYY');
  }

  @action
  saveChanges() {
    this.currentMonthValue = this.editedCurrentMonthValue;

    this.args.onChange({
      date: this.currentMonth,
      value: +this.editedCurrentMonthValue,
    });

    this.isModalOpen = false;
  }
}
