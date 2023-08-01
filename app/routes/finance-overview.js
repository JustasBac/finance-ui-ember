import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class FinanceOverviewRoute extends Route {
  @service('economy') economyService;
  @service('currency') currencyService;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model() {
    const { incomeByMonth, spendingsByMonth, totalBalanceByMonth } =
      this.economyService;

    //we need to find the longest array for cases when income, spendings and totalBalance are entered for different months
    const dataArray = [incomeByMonth, spendingsByMonth, totalBalanceByMonth];

    const lengths = dataArray.map((a) => a.length);

    const longestArrayIndex = lengths.indexOf(Math.max(...lengths));

    const data = dataArray[longestArrayIndex].map((el) => {
      const income = incomeByMonth.find((obj) => obj.date === el.date);
      const spendings = spendingsByMonth.find((obj) => obj.date === el.date);
      const totalBalance = totalBalanceByMonth.find(
        (obj) => obj.date === el.date
      );

      return {
        date: el.date,
        income: income?.value,
        spendings: spendings?.value,
        totalBalance: totalBalance?.value,
        currencySymbol: this.currencyService.getCurrencySymbol(el.currencyCode),
        currencyCode: el.currencyCode,
      };
    });

    return data.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
}
