import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import SavingPlan from 'finance-ui-ember/models/saving-plan';
import moment from 'moment';

export default class SavingPlanService extends Service {
  @tracked savingPlans = [
    new SavingPlan(
      1,
      'Apartment',
      200000,
      'EUR',
      moment(),
      moment().add(1, 'years'),
      [{ month: 'June 2023', amountSaved: 1000 }]
    ),
    new SavingPlan(
      2,
      'Car',
      20000,
      'EUR',
      moment(),
      moment().add(6, 'months'),
      [{ month: 'June 2023', amountSaved: 500 }],
      100
    ),
    new SavingPlan(
      3, //id
      'Test', //saving plan name (goal)
      2000, //goal amount
      'EUR', //selected currency code
      moment(), //starting date
      moment('2024-04-15', 'YYYY-MM-DD'), //deadline
      [{ month: 'June 2023', amountSaved: 300 }] //savings [June, July, August, Sep ....]
    ),
  ];

  addNewSavingPlan(newSavingPlan) {
    this.savingPlans.pushObject(newSavingPlan);
  }
}
