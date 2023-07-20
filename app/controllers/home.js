import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @service('economy') economyService;

  @tracked incomeByMonth = this.model.incomeByMonth;
  @tracked spendingsByMonth = this.model.spendingsByMonth;
  @tracked totalBalanceByMonth = this.model.totalBalanceByMonth;

  @action
  updateLatestMonthIncome(newValue) {
    this.incomeByMonth[this.incomeByMonth.length - 1].value = newValue;

    this.incomeByMonth = [...this.incomeByMonth];

    //TODO: api call
  }

  @action
  updateLatestMonthSpendings(newValue) {
    this.spendingsByMonth[this.spendingsByMonth.length - 1].value = newValue;

    this.spendingsByMonth = [...this.spendingsByMonth];

    //TODO: api call
  }

  @action
  updateLatestTotalBalance(newValue) {
    this.totalBalanceByMonth[this.totalBalanceByMonth.length - 1].value =
      newValue;

    this.totalBalanceByMonth = [...this.totalBalanceByMonth];

    //TODO: api call
  }
}
