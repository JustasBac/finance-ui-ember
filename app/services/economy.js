import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class EconomyService extends Service {
  @service('currency') currencyService;

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

  getCurrentMonthsData(data) {
    const currentMonth = moment().format('MMMM YYYY');

    const currentMonthData = data.find((el) => el.date === currentMonth);

    if (!currentMonthData) {
      this.currency = this.currencyService.selectedCurrency.symbol;
      return null;
    }

    this.currency = this.currencyService.getCurrencySymbol(
      currentMonthData.currencyCode
    );

    return currentMonthData.value;
  }

  updateTotalBalanceEntry({ date, value }) {
    const existingEntry = this.totalBalanceByMonth.find(
      (el) => el.date === date
    );

    if (!existingEntry) {
      const currencyCode = this.currencyService.selectedCurrency.code;

      this.totalBalanceByMonth.pushObject({
        date,
        value,
        currencyCode,
      });

      return;
    }

    existingEntry.value = value;

    this.totalBalanceByMonth = [...this.totalBalanceByMonth];
  }

  updateIncomeEntry({ date, value }) {
    const existingEntry = this.incomeByMonth.find((el) => el.date === date);

    if (!existingEntry) {
      const currencyCode = this.currencyService.selectedCurrency.code;

      this.incomeByMonth.pushObject({
        date,
        value,
        currencyCode,
      });

      return;
    }

    existingEntry.value = value;

    this.incomeByMonth = [...this.incomeByMonth];
  }

  updateSpendingsEntry({ date, value }) {
    const existingEntry = this.spendingsByMonth.find((el) => el.date === date);

    if (!existingEntry) {
      const currencyCode = this.currencyService.selectedCurrency.code;

      this.spendingsByMonth.pushObject({
        date,
        value,
        currencyCode,
      });

      return;
    }

    existingEntry.value = value;

    this.spendingsByMonth = [...this.spendingsByMonth];
  }
}
