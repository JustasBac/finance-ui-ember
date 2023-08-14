import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class FinanceOverviewController extends Controller {
  @service('finance') financeService;
  @service('user') userService;
  @service notifications;

  get nextMonth() {
    return moment(this.model[this.model.length - 1].month, 'MMMM YYYY')
      .add(1, 'months')
      .endOf('month')
      .format('MMMM YYYY');
  }

  @action
  async deleteRow(rowData) {
    let strictDelete = false; //strictDelete = true -> deletes the entity;    stictDelete = false => deletes values in the entity

    if (this.isElementFirstOrLastInArray(this.model, rowData)) {
      strictDelete = true;
    }

    const response = await this.financeService.deleteFinanceData(
      rowData,
      strictDelete
    );

    if (!response) {
      return;
    }

    if (strictDelete) {
      this.model.removeObject(rowData);
      return;
    }

    rowData.income = null;
    rowData.spendings = null;
    rowData.totalBalance = null;
  }

  @action
  async saveChangedData(currentRowData, newRowData) {
    const response = await this.financeService.updateOrAddNewEntry(newRowData);

    if (!response) {
      return;
    }
    this.notifications.success(`Changes for ${newRowData.month} were saved`, {
      autoClear: true,
    });

    currentRowData.income = newRowData.income;
    currentRowData.spendings = newRowData.spendings;
    currentRowData.updatedTotalBalance = newRowData.updatedTotalBalance;
    currentRowData.currencyCode = newRowData.currencyCode;
  }

  @action
  async addNewMonth(newMonthData) {
    const response = await this.financeService.updateOrAddNewEntry(
      newMonthData
    );

    if (!response) {
      return;
    }
  }

  isElementFirstOrLastInArray(array, element) {
    const positionInArray = array.indexOf(element);

    if (array.length - 1 === positionInArray || positionInArray === 0) {
      return true;
    }

    return false;
  }

  @action
  isDeleteAllowed(row) {
    const { income, spendings } = row;

    if (this.isElementFirstOrLastInArray(this.model, row)) {
      return true;
    }

    if (!income && !spendings) {
      return false;
    }

    return true;
  }
}
