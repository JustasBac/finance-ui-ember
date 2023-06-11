import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import SavingPlan from 'finance-ui-ember/models/saving-plan';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ModalsCreateNewSavingPlanComponent extends Component {
  @service('input-validation') validationService;
  @service notifications;

  @tracked newSavingPlan = new SavingPlan();
  @tracked isModalOpen = false;

  @action
  createSavingPlan() {
    const { currencyCode, targetAmount, title } = this.newSavingPlan;

    //todo continue
    let currencyCode = currencyCode
      ? currencyCode
      : this.currencyService.selectedCurrency.code;

    console.log('newSavingPlan', this.newSavingPlan);
    if (!title || !targetAmount || !currencyCode) {
      console.log('op');
      this.validationService.validationWasTriggered = true; //set it to true so that Input component knows that validations found some issues

      this.notifications.error('Make sure all fields are filled!', {
        autoClear: true,
      });
      return;
    }

    this.savingPlanService.addNewSavingPlan(this.newSavingPlan);

    this.notifications.success(
      `New saving plan for ${title} was successfully created`,
      {
        autoClear: true,
      }
    );
  }
}
