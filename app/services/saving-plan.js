import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import SavingPlan from 'finance-ui-ember/models/saving-plan';
import moment from 'moment';

export default class SavingPlanService extends Service {
  @tracked savingPlans = [
    new SavingPlan(1, 'Apartment', '2000000', 'EUR', moment().add(1, 'years')),
    new SavingPlan(2, 'Car', '20000', 'EUR', moment().add(6, 'months')),
  ];

  addNewSavingPlan(newSavingPlan) {
    this.savingPlans.pushObject(newSavingPlan);
  }
}
