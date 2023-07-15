import Service from '@ember/service';
// import { tracked } from '@glimmer/tracking';

export default class EconomyService extends Service {
  // @tracked incomeByMonth = [];
  // @tracked spendingsByMonth = [];
  // @tracked totalSavingsByMonth = [];

  getIncomeByMonth() {
    //api request
    const response = [
      { date: 'April 2023', value: 2650 },
      { date: 'May 2023', value: 2650 },
      { date: 'June 2023', value: 2860 },
    ];

    return response;
  }

  getSpendingsByMonth() {
    //api request
    const response = [
      { date: 'April 2023', value: 800 },
      { date: 'May 2023', value: 850 },
      { date: 'June 2023', value: 1300 },
    ];

    return response;
  }

  getTotalSavingsByMonth() {
    //api request
    const response = [
      { date: 'April 2023', value: 36800 },
      { date: 'May 2023', value: 38000 },
      { date: 'June 2023', value: 39000 },
    ];

    return response;
  }
}
