import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class FinanceOverviewRoute extends Route {
  @service('economy') economyService;

  model() {
    const incomeByMonth = this.economyService.getIncomeByMonth();
    const spendingsByMonth = this.economyService.getSpendingsByMonth();
    const totalBalanceByMonth = this.economyService.getTotalBalanceByMonth();

    return { incomeByMonth, spendingsByMonth, totalBalanceByMonth };
  }
}
