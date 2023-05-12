import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import SavingPlan from 'finance-ui-ember/models/saving-plan';
import moment from 'moment';

export default class SavingPlanService extends Service {
  @tracked savingPlans = [
    new SavingPlan('Aparmtnet', '2000000', 'SEK', moment().add(1, 'years')),
  ];

  addNewSavingPlan(title, moneyAmount, currency, deadlineDate) {
    this.savingPlans.pushObject(
      new SavingPlan(title, moneyAmount, currency, deadlineDate)
    );
  }
}
