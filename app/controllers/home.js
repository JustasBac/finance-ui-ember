import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';
import SavingPlan from 'finance-ui-ember/models/saving-plan';

export default class HomeController extends Controller {
  @service('input-validation') validationService;
  @service('saving-plan') savingPlanService;
  @service notifications;

  @tracked existingSavingPlans = [];
  @tracked isSavingPlanCreationBlockOpen = false;
  @tracked selectedDate = moment().add(1, 'days'); //default deadline is tomorrow

  @tracked newSavingPlan = new SavingPlan();

  @action
  createSavingPlan() {
    const { currency, goalAmount, title } = this.newSavingPlan;

    if (!title || !goalAmount || !currency) {
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

    this.isSavingPlanCreationBlockOpen = false;
    this.newSavingPlan = new SavingPlan();
  }
}
