import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class FinanceOverviewController extends Controller {
  @service('economy') economyService;
  @service('currency') currencyService;
  @service notifications;

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
  getCurrencySymbol(currencyCode) {
    return this.currencyService.getCurrencySymbol(currencyCode);
  }

  @action
  deleteRow(row) {
    this.model.removeObject(row);
  }

  @action
  async saveChangedData(currentRowData, newRowData) {
    const responses = await this.updateEntriesInService(
      currentRowData,
      newRowData
    ); //result of Promise.all()

    if (responses.some((response) => response === false)) {
      return;
    }

    this.notifications.success(`Changes for ${newRowData.date} were saved`, {
      autoClear: true,
    });

    this.model.removeObject(currentRowData);
    this.model.pushObject(newRowData);
    this.sortRowsFromEarliestToLatest();
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

  updateEntriesInService(currentRowData, newRowData) {
    const { date, currencyCode } = newRowData;

    const financialDataTypes = ['income', 'spendings', 'totalBalance'];

    if (currencyCode !== currentRowData.currencyCode) {
      return this.updateAllEntries(newRowData);
    }

    const requests = financialDataTypes.map(async (dataType) => {
      if (currentRowData[dataType] !== +newRowData[dataType]) {
        //check if there are changes per each data type ---> if yes, then proceed with API PUT request
        const id = this.economyService[`${dataType}ByMonth`].find(
          (el) => el.month === date
        ).id;

        const request = await this.economyService.updateEntry(dataType, {
          date,
          value: newRowData[dataType],
          currencyCode,
          id,
        });

        return request;
      }
    });

    return Promise.all(requests);
  }

  updateAllEntries(newRowData) {
    const financialDataTypes = ['income', 'spendings', 'totalBalance'];

    const requests = financialDataTypes.map(async (dataType) => {
      const id = this.economyService[`${dataType}ByMonth`].find(
        (el) => el.month === newRowData.date
      ).id;

      const request = await this.economyService.updateEntry(dataType, {
        date: newRowData.date,
        value: newRowData[dataType],
        currencyCode: newRowData.currencyCode,
        id,
      });

      return request;
    });

    return Promise.all(requests);
  }
}
