import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import SavingPlan from 'finance-ui-ember/models/saving-plan';
import moment from 'moment';
import { inject as service } from '@ember/service';
export default class SavingPlanService extends Service {
  @service notifications;

  @tracked savingPlans = [
    new SavingPlan(
      1,
      'Apartment',
      100000,
      'EUR',
      moment('2023-06-09', 'YYYY-MM-DD'),
      moment('2024-05-02', 'YYYY-MM-DD'),
      [{ month: 'June 2023', amountSaved: 2700 }],
      80000
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
    new SavingPlan(
      4, //id
      'Test', //saving plan name (goal)
      2000, //goal amount
      'EUR', //selected currency code
      moment(), //starting date
      moment('2024-04-15', 'YYYY-MM-DD'), //deadline
      [{ month: 'June 2023', amountSaved: 300 }] //savings [June, July, August, Sep ....]
    ),
    new SavingPlan(
      5, //id
      'Test', //saving plan name (goal)
      2000, //goal amount
      'EUR', //selected currency code
      moment(), //starting date
      moment('2024-04-15', 'YYYY-MM-DD'), //deadline
      [{ month: 'June 2023', amountSaved: 300 }] //savings [June, July, August, Sep ....]
    ),
  ];

  addNewSavingPlan(newSavingPlan) {
    newSavingPlan.id = this.savingPlans.length + 1;

    newSavingPlan.monthsListUntilDeadline =
      newSavingPlan.getMonthsListUntilDeadline();

    this.savingPlans.pushObject(newSavingPlan);

    this.notifications.success(
      `New saving plan for ${newSavingPlan.title} was successfully created`,
      {
        autoClear: true,
      }
    );
  }
}
