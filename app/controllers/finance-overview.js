import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class FinanceOverviewController extends Controller {
  @service('economy') economyService;

  get previousMonth() {
    return moment(this.model[0].date, 'MMMM YYYY')
      .subtract(1, 'months')
      .endOf('month')
      .format('MMMM YYYY');
  }

  get nextMonth() {
    return moment(this.model[this.model.length - 1].date, 'MMMM YYYY')
      .add(1, 'months')
      .endOf('month')
      .format('MMMM YYYY');
  }

  @action
  deleteRow(row) {
    this.model.removeObject(row);
  }

  @action
  saveChangedData(currentRowData, newRowData) {
    this.model.removeObject(currentRowData);
    this.model.pushObject(newRowData);

    this.sortRowsFromEarliestToLatest();

    this.updateEntriesInService(newRowData);
  }

  @action
  addNewMonth(newMonthData) {
    this.model.pushObject(newMonthData);
    this.sortRowsFromEarliestToLatest();

    this.updateEntriesInService(newMonthData);
  }

  sortRowsFromEarliestToLatest() {
    this.model.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  updateEntriesInService(newMonthData) {
    const { date, income, spendings, totalBalance } = newMonthData;

    this.economyService.updateIncomeEntry({ date, value: income });
    this.economyService.updateSpendingsEntry({ date, value: spendings });
    this.economyService.updateTotalBalanceEntry({ date, value: totalBalance });
  }
}
