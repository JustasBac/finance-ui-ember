import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';
import FinanceEntry from 'finance-ui-ember/models/finance-entry';

export default class EconomyService extends Service {
  @service('user') userService;
  @service('requests') requestService;
  @service notifications;

  @tracked financeDataList = [];

  async fetchAndSetFinanceData() {
    const financeData = await this.requestService.fetch('finance_data');

    this.financeDataList = financeData.map((el) => {
      return new FinanceEntry(
        el.id,
        el.month,
        el.income,
        el.spendings,
        el.total_balance,
        el.currency_code
      );
    });
  }

  getCurrentMonthsData() {
    const currentMonth = moment().format('MMMM YYYY');

    const currentMonthData = this.financeDataList.find(
      (el) => el.month === currentMonth
    );

    if (!currentMonthData) {
      return null;
    }

    return currentMonthData;
  }

  async updateOrAddNewEntry(financeData) {
    const { month, currencyCode, income, spendings, totalBalance, id } =
      financeData;

    const existingEntry = this.financeDataList.find(
      (el) => el.month === financeData.month
    );

    const body = {
      month,
      currency_code: currencyCode,
      income,
      spendings,
      total_balance: totalBalance,
    };

    if (!existingEntry) {
      //POST
      const response = await this.requestService.post('finance_data', body);

      if (!response || !response.id) {
        this.notifications.error('Request error');
        return false;
      }

      this.financeDataList.pushObject(
        new FinanceEntry(
          response.id,
          response.month,
          response.income,
          response.spendings,
          response.total_balance,
          response.currency_code
        )
      );

      return true;
    }

    //PUT
    const response = await this.requestService.put(`finance_data/${id}`, body);

    if (!response || !response.id) {
      this.notifications.error('Request error');
      return false;
    }

    return true;
  }

  async deleteFinanceData(data, strictDelete = false) {
    const response = await this.requestService.delete(
      'finance_data',
      `${data.id}?strict_delete=${strictDelete}`
    );

    if (!response.ok) {
      this.notifications.error('Delete request error');
      return false;
    }

    this.notifications.success(`Finance data for ${data.month} was deleted`, {
      autoClear: true,
    });

    return true;
  }
}
