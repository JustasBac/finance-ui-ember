import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class FinancePanelController extends Controller {
  @service('finance') financeService;
  @service('user') userService;
  @service notifications;

  get nextMonth() {
    return moment(this.model[this.model.length - 1].datetime).add(1, 'months');
  }

  get initialTotalBalanceMonth() {
    if (this.financeService.financeDataList.length) {
      const firstMonthEntryDatetime =
        this.financeService.financeDataList[0].datetime;
      return moment(firstMonthEntryDatetime).format('MMMM YYYY');
    }

    return moment().format('MMMM YYYY');
  }

  @action
  async deleteRow(rowData) {
    const strictDelete = this.getStrictDeleteState(this.model, rowData); //strictDelete = true -> deletes the entity;    stictDelete = false => deletes values in the entity

    const response = await this.financeService.deleteFinanceData(
      rowData,
      strictDelete
    );

    if (!response) {
      return;
    }

    rowData.income = null;
    rowData.spendings = null;
    rowData.updatedTotalBalance = rowData.initialTotalBalance;
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
    this.financeService.updateOrAddNewEntry(newMonthData);
  }

  getStrictDeleteState(array, element) {
    const positionInArray = array.indexOf(element);

    if (array.length > 1 && positionInArray === 0) {
      return false;
    }

    if (
      array.length > 2 &&
      positionInArray != 0 &&
      positionInArray != array.length - 1
    ) {
      return false;
    }

    return true;
  }

  @action
  isDeleteAllowed(row) {
    const { income, spendings } = row;

    if (this.getStrictDeleteState(this.model, row)) {
      return true;
    }

    if (!income && !spendings) {
      return false;
    }

    return true;
  }
}
