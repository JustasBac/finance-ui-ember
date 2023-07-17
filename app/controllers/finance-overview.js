import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class FinanceOverviewController extends Controller {
  @service('economy') economyService;
  @service('currency') currencyService;

  get rows() {
    const { incomeByMonth, spendingsByMonth, totalBalanceByMonth } = this.model;

    return incomeByMonth.map((el) => {
      const spendings = spendingsByMonth.find((obj) => obj.date === el.date);
      const totalBalance = totalBalanceByMonth.find(
        (obj) => obj.date === el.date
      );

      return {
        date: el.date,
        income: el.value,
        spendings: spendings.value,
        totalBalance: totalBalance.value,
        currency: this.currencyService.getCurrencySymbol(el.currencyCode),
      };
    });
  }
}
