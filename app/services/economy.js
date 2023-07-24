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
      // { date: 'April 2023', value: 2650, currencyCode: 'EUR' },
      // { date: 'May 2023', value: 2650, currencyCode: 'EUR' },
      // { date: 'June 2023', value: 2860, currencyCode: 'EUR' },
      // { date: 'July 2023', value: null, currencyCode: 'EUR' },
    ];

    return response;
  }

  getSpendingsByMonth() {
    //api request
    const response = [
      // { date: 'April 2023', value: 800, currencyCode: 'EUR' },
      // { date: 'May 2023', value: 850, currencyCode: 'EUR' },
      // { date: 'June 2023', value: 1300, currencyCode: 'EUR' },
      // { date: 'July 2023', value: null, currencyCode: 'EUR' },
    ];

    return response;
  }

  getTotalBalanceByMonth() {
    //api request
    const response = [
      // { date: 'April 2023', value: 36800, currencyCode: 'EUR' },
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
      return null;
    }

    return currentMonthData;
  }

  updateTotalBalanceEntry(newData) {
    this.updateEntry('totalBalance', newData);
  }

  updateIncomeEntry(newData) {
    this.updateEntry('income', newData);
  }

  updateSpendingsEntry(newData) {
    this.updateEntry('spendings', newData);
  }

  updateEntry(dateType, { date, value }) {
    const existingEntry = this[`${dateType}ByMonth`].find(
      (el) => el.date === date
    );

    if (!existingEntry) {
      const currencyCode = this.currencyService.selectedCurrency.code;

      this[`${dateType}ByMonth`].pushObject({
        date,
        value,
        currencyCode,
      });

      return;
    }

    existingEntry.value = value;

    this[`${dateType}ByMonth`] = [...this[`${dateType}ByMonth`]];
  }
}
