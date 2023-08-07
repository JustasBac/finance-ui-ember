import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class FinanceOverviewController extends Controller {
  @service('economy') economyService;
  @service('currency') currencyService;
  @service notifications;

  get previousMonth() {
    return moment(this.model[0].month, 'MMMM YYYY')
      .subtract(1, 'months')
      .endOf('month')
      .format('MMMM YYYY');
  }

  get nextMonth() {
    return moment(this.model[this.model.length - 1].month, 'MMMM YYYY')
      .add(1, 'months')
      .endOf('month')
      .format('MMMM YYYY');
  }

  @action
  getCurrencySymbol(currencyCode) {
    return this.currencyService.getCurrencySymbol(currencyCode);
  }

  @action
  async deleteRow(rowData) {
    const response = await this.economyService.deleteFinanceData(rowData);

    if (!response) {
      return;
    }
    rowData.income = null;
    rowData.spendings = null;
    rowData.totalBalance = null;
  }

  @action
  async saveChangedData(currentRowData, newRowData) {
    const response = await this.economyService.updateOrAddNewEntry(newRowData);

    if (!response) {
      return;
    }
    //TODO: COntinue with strict delete
    this.notifications.success(`Changes for ${newRowData.date} were saved`, {
      autoClear: true,
    });

    currentRowData.income = newRowData.income;
    currentRowData.spendings = newRowData.spendings;
    currentRowData.totalBalance = newRowData.totalBalance;
    currentRowData.currencyCode = newRowData.currencyCode;

    this.sortRowsFromEarliestToLatest();
  }

  @action
  async addNewMonth(newMonthData) {
    const response = await this.economyService.updateOrAddNewEntry(
      newMonthData
    );

    if (!response) {
      return;
    }

    this.sortRowsFromEarliestToLatest();
  }

  sortRowsFromEarliestToLatest() {
    this.model.sort((a, b) => new Date(a.month) - new Date(b.month));
  }
}
