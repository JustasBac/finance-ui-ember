import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import SavingPlan from 'finance-ui-ember/models/saving-plan';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ModalsCreateNewSavingPlanComponent extends Component {
  @service('input-validation') validationService;
  @service('user') userService;
  @service('saving-plan') savingPlanService;
  @service notifications;

  @tracked newSavingPlan = new SavingPlan();
  @tracked isModalOpen = false;

  @action
  createSavingPlan() {
    const { currencyCode, targetAmount, title } = this.newSavingPlan;

    if (!currencyCode) {
      //if no currency was selected, apply currency that is selected as a global app currency
      this.newSavingPlan.currencyCode = this.userService.selectedCurrency.code;
    }

    if (!title || !targetAmount) {
      this.validationService.validationWasTriggered = true; //set it to true so that Input component knows that validations found some issues

      this.notifications.error('Make sure all fields are filled!', {
        autoClear: true,
      });
      return;
    }

    this.savingPlanService.addNewSavingPlan(this.newSavingPlan);

    this.isModalOpen = false;
  }
}
