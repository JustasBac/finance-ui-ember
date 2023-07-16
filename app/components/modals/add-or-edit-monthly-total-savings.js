import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalsAddOrEditMonthlyTotalSavingsComponent extends Component {
  @service('currency') currencyService;

  @tracked isModalOpen = false;
  @tracked totalBalance = this.args.totalBalance; //make copy so we don't update the intitial value if not saved

  @action
  saveChanges() {
    this.args.onChange(this.totalBalance);

    this.isModalOpen = false;
  }
}
