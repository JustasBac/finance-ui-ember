import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalsAddOrEditFinanceDataEntryComponent extends Component {
  @service('currency') currencyService;
  @service('economy') economyService;

  @tracked isModalOpen = false;

  @tracked currentMonthData = this.economyService.getCurrentMonthsData();

  @tracked valueInput = this.value || null; //used for input because we don't want to update the value without user confirming it

  get currencySymbol() {
    return this.currencyService.getCurrencySymbol(
      this.currentMonthData.currencyCode
    );
  }

  get value() {
    const { type } = this.args;

    return this.currentMonthData[
      type === 'total balance' ? 'totalBalance' : type
    ];
  }

  @action
  saveChanges() {
    const type =
      this.args.type === 'total balance' ? 'totalBalance' : this.args.type;

    console.log('this.currentMonthData', this.currentMonthData);

    this.economyService.updateEntry(
      type,
      this.currentMonthData.month,
      this.valueInput
    );

    this.isModalOpen = false;
  }
}
