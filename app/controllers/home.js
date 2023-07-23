import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeController extends Controller {
  @service('economy') economyService;

  @action
  updateLatestMonthIncome(newData) {
    this.economyService.updateIncomeEntry(newData);
  }

  @action
  updateLatestMonthSpendings(newData) {
    this.economyService.updateSpendingsEntry(newData);
  }

  @action
  updateLatestTotalBalance(newData) {
    this.economyService.updateTotalBalanceEntry(newData);
  }
}
