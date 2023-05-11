import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service('input-validation') validationService;
  @service notifications;

  @tracked existingSavingPlans = [];
  @tracked isSavingPlanCreationBlockOpen = false;
  @tracked selectedDate = moment();

  @action
  createSavingPlan() {
    console.log('savingGoalTitle', this.savingGoalTitle);
    console.log('goalAmount', this.goalAmount);
    console.log('enteredCurrency', this.enteredCurrency);
    console.log('selectedDate', this.selectedDate);

    this.validationService.validationWasTriggered = true;
    this.notifications.error('Make sure all fields are filled!');
  }
}
