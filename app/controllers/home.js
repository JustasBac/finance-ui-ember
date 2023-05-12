import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service('input-validation') validationService;
  @service('saving-plan') savingPlanService;
  @service notifications;

  @tracked existingSavingPlans = [];
  @tracked isSavingPlanCreationBlockOpen = false;
  @tracked selectedDate = moment().add(1, 'days'); //default deadline is tomorrow

  @action
  createSavingPlan() {
    if (!this.savingGoalTitle || !this.goalAmount || !this.enteredCurrency) {
      this.validationService.validationWasTriggered = true; //set it to true so that Input component knows that validations found some issues

      this.notifications.error('Make sure all fields are filled!', {
        autoClear: true,
      });
      return;
    }

    this.savingPlanService.addNewSavingPlan(
      this.savingGoalTitle,
      this.goalAmount,
      this.enteredCurrency,
      this.selectedDate
    );

    this.notifications.success(
      `New saving plan for ${this.savingGoalTitle} was successfully created`,
      {
        autoClear: true,
      }
    );

    this.isSavingPlanCreationBlockOpen = false;
  }
}
