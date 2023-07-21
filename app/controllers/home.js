import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeController extends Controller {
  @service('economy') economyService;

  @action
  updateLatestMonthIncome(newValue) {
    this.economyService.incomeByMonth[
      this.economyService.incomeByMonth.length - 1
    ].value = newValue;

    this.economyService.incomeByMonth = [...this.economyService.incomeByMonth];
    // this.economyService.updateIncomeEntry(newData);
  }

  @action
  updateLatestMonthSpendings(newValue) {
    this.economyService.spendingsByMonth[
      this.economyService.spendingsByMonth.length - 1
    ].value = newValue;

    this.economyService.spendingsByMonth = [
      ...this.economyService.spendingsByMonth,
    ];

    // this.economyService.updateSpendingsEntry(newData);
  }

  @action
  updateLatestTotalBalance(newData) {
    this.economyService.updateTotalBalanceEntry(newData);
  }
}
