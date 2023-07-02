import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalsAddOrEditMonthlySpendingsComponent extends Component {
  @service('currency') currencyService;

  @tracked isModalOpen = false;
  @tracked monthSpendings = this.args.monthSpendings; //make copy so we don't update the intitial value if not saved

  @action
  saveChanges() {
    this.args.onChange(this.monthSpendings);

    this.isModalOpen = false;
  }
}
