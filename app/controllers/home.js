import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service('economy') economyService;

  get incomeByMonth() {
    return (async () => {
      return await this.economyService.getIncomeByMonth();
    })();
  }

  get spendingsByMonth() {
    return (async () => {
      return await this.economyService.getSpendingsByMonth();
    })();
  }

  get totalSavingsByMonth() {
    return this.economyService.getTotalSavingsByMonth();
  }
}
