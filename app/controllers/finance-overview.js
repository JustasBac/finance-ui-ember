import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class FinanceOverviewController extends Controller {
  @service('economy') economyService;
  @service('currency') currencyService;

  @tracked rows = this.getRows();

  getRows() {
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

  get previousMonth() {
    return moment(this.rows[0].date, 'MMMM YYYY')
      .subtract(1, 'months')
      .endOf('month')
      .format('MMMM YYYY');
  }

  get nextMonth() {
    return moment(this.rows[this.rows.length - 1].date, 'MMMM YYYY')
      .add(1, 'months')
      .endOf('month')
      .format('MMMM YYYY');
  }

  @action
  deleteRow(row) {
    this.rows.removeObject(row);
  }

  @action
  saveChangedData(currentRowData, newRowData) {
    this.rows.removeObject(currentRowData);
    this.rows.pushObject(newRowData);
    this.sortRowsFromEarliestToLatest();
  }

  sortRowsFromEarliestToLatest() {
    this.rows.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  @action
  addNewMonth(newMonthData) {
    this.rows.pushObject(newMonthData);
    this.sortRowsFromEarliestToLatest();
    console.log('save');
  }
}
