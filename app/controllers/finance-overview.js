import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class FinanceOverviewController extends Controller {
  @service('economy') economyService;

  @tracked rows = this.model;

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

    //------------------Update service
    const { date, income, spendings, totalBalance } = newRowData;

    //update total balance
    this.economyService.updateTotalBalanceEntry({ date, value: totalBalance });

    //update income
    const incomeEntry = this.economyService.incomeByMonth.find(
      (el) => el.date === date
    );
    incomeEntry.value = +income;

    //update spendings
    const spendingsEntry = this.economyService.spendingsByMonth.find(
      (el) => el.date === date
    );
    spendingsEntry.value = +spendings;
    //todo: move the update logic to service
  }

  sortRowsFromEarliestToLatest() {
    this.rows.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  @action
  addNewMonth(newMonthData) {
    console.log('newMonthData', newMonthData);

    this.rows.pushObject(newMonthData);
    this.sortRowsFromEarliestToLatest();

    const { date, income, spendings, totalBalance } = newMonthData;

    //update the database
    this.economyService.updateIncomeEntry({ date, value: income });
    this.economyService.updateSpendingsEntry({ date, value: spendings });
    this.economyService.updateTotalBalanceEntry({ date, value: totalBalance });
  }
}
