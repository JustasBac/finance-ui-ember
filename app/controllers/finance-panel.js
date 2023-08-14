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
    console.log('newMonthData', newMonthData);
    this.financeService.updateOrAddNewEntry(newMonthData);
  }

  isElementFirstOrLastInArray(array, element) {
    const positionInArray = array.indexOf(element);

    if (positionInArray === 0) {
      return false;
    }

    if (array.length - 1 === positionInArray) {
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
