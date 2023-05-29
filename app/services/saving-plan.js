import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import SavingPlan from 'finance-ui-ember/models/saving-plan';
import moment from 'moment';

export default class SavingPlanService extends Service {
  @tracked savingPlans = [
    new SavingPlan(1, 'Apartment', 200000, 'EUR', moment().add(1, 'years'), 0),
    new SavingPlan(2, 'Car', 20000, 'EUR', moment().add(6, 'months'), 100),
    new SavingPlan(
      3,
      'Test',
      2000,
      'EUR',
      moment('2024-04-15', 'YYYY-MM-DD'),
      0
    ),
  ];

  addNewSavingPlan(newSavingPlan) {
    this.savingPlans.pushObject(newSavingPlan);
  }
}
