import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';
import FinanceEntry from 'finance-ui-ember/models/finance-entry';

export default class FinanceService extends Service {
  @service('user') userService;
  @service('requests') requestService;
  @service notifications;

  @tracked financeDataList = [];

  async fetchAndSetFinanceData() {
    const financeData = await this.requestService.fetch('finance_data');

    this.financeDataList = financeData.map((el) => {
      return new FinanceEntry(
        el.id,
        el.datetime,
        el.income,
        el.spendings,
        el.initial_total_balance,
        el.updated_total_balance,
        el.currency_code
      );
    });
  }

  getCurrentMonthsData() {
    const currentMonth = moment().format('MMMM YYYY');

    const currentMonthData = this.financeDataList.find(
      (el) => moment(el.datetime).format('MMMM YYYY') === currentMonth
    );

    if (!currentMonthData) {
      return null;
    }

    return currentMonthData;
  }

  async updateOrAddNewEntry(financeData) {
    const {
      datetime,
      currencyCode,
      income,
      spendings,
      initialTotalBalance,
      updatedTotalBalance,
      totalBalanceDifferenceFromTheLastValue,
      id,
    } = financeData;

    const existingEntry = this.financeDataList.find(
      (el) => el.datetime === financeData.datetime
    );

    const body = {
      datetime, //moment formats date to the first day of the month. We care about a month and a year. Add 2 days to avoid problems with UTC offset
      currency_code: currencyCode,
      income,
      spendings,
      updated_total_balance: updatedTotalBalance,
    };

    if (!existingEntry) {
      body.initial_total_balance = initialTotalBalance;
      //POST
      const response = await this.requestService.post('finance_data', body);

      if (!response || !response.id) {
        this.notifications.error('Request error');
        return false;
      }

      this.financeDataList.pushObject(
        new FinanceEntry(
          response.id,
          response.datetime,
          response.income,
          response.spendings,
          response.initial_total_balance,
          response.updated_total_balance,
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

    if (totalBalanceDifferenceFromTheLastValue) {
      //for cases when user has data for several months, and updates data for the months that are infront. Then we need to recalculate total balance
      this.recalculateTotalBalanceValues(
        datetime,
        totalBalanceDifferenceFromTheLastValue
      );
    }

    return true;
  }

  recalculateTotalBalanceValues(startMonth, difference) {
    //if we edit income or spendings of already existing month, we need to re-adjust the months that are in the future. Their total balance values should be updated
    this.financeDataList.forEach((el) => {
      if (moment(el.datetime).isAfter(startMonth)) {
        el.initialTotalBalance = el.initialTotalBalance + difference;
        el.updatedTotalBalance = el.updatedTotalBalance + difference;

        this.updateOrAddNewEntry(el);
      }
    });
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

    if (strictDelete) {
      this.financeDataList.removeObject(data);
    } else {
      const difference = data.spendings - data.income; //when user deletes finance entry that is surounded by months that have data, recalculate total balance of the months after

      this.recalculateTotalBalanceValues(data.datetime, difference);
    }

    this.notifications.success(
      `Finance data for ${moment(data.datetime).format(
        'MMMM YYYY'
      )} was deleted`,
      {
        autoClear: true,
      }
    );

    return true;
  }
}
