import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import SavingPlan from 'finance-ui-ember/models/saving-plan';
import moment from 'moment';
import { inject as service } from '@ember/service';
export default class SavingPlanService extends Service {
  @service notifications;
  @service('requests') requestService;

  @tracked savingPlans = [];

  async fetchAndSetSavingPlans() {
    const savingPlans = await this.requestService.fetch('saving_plans');

    this.savingPlans = [];

    for (const savingPlan of savingPlans.reverse()) {
      // .reverse() because the API returns data with the newest entities first. In the UI we want to show the oldest on top of the list
      const monthlySavings = savingPlan['monthly_savings_list'].map((el) => {
        return { month: el.month, amountSaved: el['amount_saved'], id: el.id };
      });

      this.savingPlans.pushObject(
        new SavingPlan(
          savingPlan['id'],
          savingPlan['target_title'],
          savingPlan['target_amount'],
          savingPlan['currency_code'],
          moment(savingPlan['start_date']),
          moment(savingPlan['end_date']),
          monthlySavings,
          savingPlan['starting_capital']
        )
      );
    }
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
      `saving_plan/${savingPlan['id']}`,
      body
    );

    if (!response.id) {
      this.notifications.error('Request error');
      return false;
    }

    return true;
  }

  async addMonthlySavings(savingPlan, monthInfo, savedAmount) {
    //decide between POST and PUT request

    const monthThatAlreadyHasSavedAmount = savingPlan.savingsPerMonth.find(
      (el) => el.month === monthInfo.formatedDate
    );

    if (monthThatAlreadyHasSavedAmount) {
      //PUT
      const monthId = savingPlan.savingsPerMonth.find(
        (el) => el.month === monthInfo.formatedDate
      ).id;

      const body = {
        amount_saved: +savedAmount,
      };

      const response = await this.requestService.put(
        `monthly_savings/${monthId}`,
        body
      );

      if (!response.id) {
        this.notifications.error('Request error');
        return;
      }

      monthThatAlreadyHasSavedAmount.amountSaved = +savedAmount;
    } else {
      const body = {
        saving_plan_id: savingPlan.id,
        month: monthInfo.formatedDate,
        amount_saved: +savedAmount,
      };

      const response = await this.requestService.post('monthly_savings', body);

      if (!response || !response.id) {
        this.notifications.error('Request error');
        return;
      }

      savingPlan.savingsPerMonth.pushObject({
        month: monthInfo.formatedDate,
        amountSaved: +savedAmount,
        id: response.id,
      });
    }

    savingPlan.monthsListUntilDeadline =
      savingPlan.getMonthsListUntilDeadline();
    savingPlan.totalSavings = savingPlan.calculateTotalSavings();
  }
}
