import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EconomyService extends Service {
  @tracked incomeByMonth = this.getIncomeByMonth();
  @tracked spendingsByMonth = this.getSpendingsByMonth();
  @tracked totalBalanceByMonth = this.getTotalBalanceByMonth();

  getIncomeByMonth() {
    //api request
    const response = [
      { date: 'April 2023', value: 2650, currencyCode: 'EUR' },
      // { date: 'May 2023', value: 2650, currencyCode: 'EUR' },
      // { date: 'June 2023', value: 2860, currencyCode: 'EUR' },
      // { date: 'July 2023', value: null, currencyCode: 'EUR' },
    ];

    return response;
  }

  getSpendingsByMonth() {
    //api request
    const response = [
      { date: 'April 2023', value: 800, currencyCode: 'EUR' },
      // { date: 'May 2023', value: 850, currencyCode: 'EUR' },
      // { date: 'June 2023', value: 1300, currencyCode: 'EUR' },
      // { date: 'July 2023', value: null, currencyCode: 'EUR' },
    ];

    return response;
  }

  getTotalBalanceByMonth() {
    //api request
    const response = [
      { date: 'April 2023', value: 36800, currencyCode: 'EUR' },
      // { date: 'May 2023', value: 38000, currencyCode: 'EUR' },
      // { date: 'June 2023', value: 39000, currencyCode: 'EUR' },
      // { date: 'July 2023', value: 39000, currencyCode: 'EUR' },
    ];

    return response;
  }
}
