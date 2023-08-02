import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SavingPlansCardComponent extends Component {
  @service('saving-plan') savingPlanService;
  @service('currency') currencyService;

  @action
  getSavingPlans() {
    this.savingPlanService.fetchSavingPlans();
  }
}
