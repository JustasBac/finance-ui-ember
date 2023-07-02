import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalsAddOrEditMonthlyIncomeComponent extends Component {
  @service('currency') currencyService;

  @tracked isModalOpen = false;
  @tracked monthIncome = this.args.monthIncome; //make copy so we don't update the intitial value if not saved

  @action
  saveChanges() {
    this.args.onChange(this.monthIncome);

    this.isModalOpen = false;
  }
}
