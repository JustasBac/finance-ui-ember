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
        el.month,
        el.income,
        el.spendings,
        el.initial_total_balance,
        el.updated_total_balance,
        el.currency_code
      );
    });

    this.sortFinancialDataByDate();
  }

  sortFinancialDataByDate() {
    this.financeDataList = this.financeDataList.sort(
      (a, b) => new Date(a.month) - new Date(b.month)
    );

    console.log('sorted', this.financeDataList);
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
    const {
      month,
      currencyCode,
      income,
      spendings,
      initialTotalBalance,
      updatedTotalBalance,
      totalBalanceDifferenceFromTheLastValue,
      id,
    } = financeData;

    const existingEntry = this.financeDataList.find(
      (el) => el.month === financeData.month
    );

    const body = {
      month,
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

      this.userService.updateUserTotalBalance(updatedTotalBalance);

      this.financeDataList.pushObject(
        new FinanceEntry(
          response.id,
          response.month,
          response.income,
          response.spendings,
          response.initial_total_balance,
          response.updated_total_balance,
          response.currency_code
        )
      );
      this.sortFinancialDataByDate();
      return true;
    }

    //PUT
    const response = await this.requestService.put(`finance_data/${id}`, body);

    if (!response || !response.id) {
      this.notifications.error('Request error');
      return false;
    }
    this.userService.updateUserTotalBalance(updatedTotalBalance);

    if (totalBalanceDifferenceFromTheLastValue) {
      //for cases when user has data for several months, and updates data for the months that are infront. Then we need to recalculate total balance
      this.recalculateTotalBalanceValues(
        month,
        totalBalanceDifferenceFromTheLastValue
      );
    }

    return true;
  }

  recalculateTotalBalanceValues(startMonth, difference) {
    //if we edit income or spendings of already existing month, we need to re-adjust the months that are in the future. Their total balance values should be updated
    this.financeDataList.forEach((el) => {
      if (moment(el.month, 'MMMM YYYY').isAfter(startMonth, 'MMMM YYYY')) {
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

      const relevantTotalBalance =
        this.financeDataList[this.financeDataList.length - 1]
          .updatedTotalBalance;

      this.userService.updateUserTotalBalance(relevantTotalBalance);
    } else {
      const difference = data.spendings - data.income; //when user deletes finance entry that is surounded by months that have data, recalculate total balance of the months after

      console.log('difference', difference);
      this.recalculateTotalBalanceValues(data.month, difference);
    }

    this.notifications.success(`Finance data for ${data.month} was deleted`, {
      autoClear: true,
    });

    return true;
  }
}
