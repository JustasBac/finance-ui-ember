import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import SavingPlan from 'finance-ui-ember/models/saving-plan';
import moment from 'moment';
import { inject as service } from '@ember/service';
export default class SavingPlanService extends Service {
  @service notifications;
  @service('requests') requestService;

  @tracked savingPlans = [];

  async fetchSavingPlans() {
    const savingPlans = await this.requestService.fetch('saving_plans');

    this.savingPlans = [];

    for (const savingPlan of savingPlans) {
      this.savingPlans.pushObject(
        new SavingPlan(
          savingPlan['id'],
          savingPlan['target_title'],
          savingPlan['target_amount'],
          savingPlan['currency_code'],
          moment(savingPlan['start_date']),
          moment(savingPlan['end_date']),
          savingPlan['monthly_savings_list'],
          savingPlan['starting_capital']
        )
      );
    }

    return savingPlans;
  }

  async addNewSavingPlan(newSavingPlan) {
    const body = {
      target_title: newSavingPlan.title,
      target_amount: newSavingPlan.targetAmount,
      currency_code: newSavingPlan.currencyCode,
      start_date: moment(newSavingPlan.startDate).format(),
      end_date: moment(newSavingPlan.deadlineDate).format(),
      starting_capital: newSavingPlan.startingCapital,
    };

    const response = await this.requestService.post('saving_plans', body);

    newSavingPlan.id = +response['id'];

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

  async deleteSavingPlan(savingPlan) {
    const response = await this.requestService.delete(
      'saving_plan',
      savingPlan['id']
    );

    if (!response.ok) {
      this.notifications.error('Delete request error');
      return false;
    }

    this.notifications.success('Saving plan was deleted', {
      autoClear: true,
    });

    this.savingPlans.removeObject(savingPlan);

    return true;
  }

  async updateSavingPlan(savingPlan) {
    const body = {
      target_title: savingPlan.title,
      target_amount: savingPlan.targetAmount,
      currency_code: savingPlan.currencyCode,
      start_date: moment(savingPlan.startDate).format(),
      end_date: moment(savingPlan.deadlineDate).format(),
      starting_capital: savingPlan.startingCapital,
    };

    const response = await this.requestService.put(
      'saving_plan',
      body,
      savingPlan['id']
    );

    if (!response.id) {
      this.notifications.error('Request error');
      return false;
    }

    return true;
  }
}
