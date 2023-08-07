import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import moment from 'moment';
import FinanceEntry from 'finance-ui-ember/models/finance-entry';

export default class EconomyService extends Service {
  @service('currency') currencyService;
  @service('requests') requestService;
  @service notifications;

  @tracked financeDataList = [];

  async fetchAndSetFinanceData() {
    this.isLoading = true;

    const financeData = await this.requestService.fetch(
      'finance_overview_data'
    );

    const incomeList = financeData['income_list'];
    const spendingsList = financeData['spendings_list'];
    const totalBalanceList = financeData['total_balance_list'];

    const listOfMonthsWithData = this.getMonthsWithData([
      incomeList,
      spendingsList,
      totalBalanceList,
    ]);

    this.financeDataList = listOfMonthsWithData.map((month) => {
      const income = incomeList.find((el) => el.month === month);
      const spendings = spendingsList.find((el) => el.month === month);
      const totalBalance = totalBalanceList.find((el) => el.month === month);

      const currencyCode = income
        ? income['currency_code']
        : spendings
        ? spendings['currency_code']
        : totalBalance['currency_code'];

      return new FinanceEntry(
        month,
        income?.value,
        spendings?.value,
        totalBalance?.value,
        currencyCode
      );
    });
  }

  getMonthsWithData(dataArray) {
    const monthsList = [];

    for (const dataSetByType of dataArray) {
      for (const dataElement of dataSetByType) {
        monthsList.push(dataElement['month']);
      }
    }

    return [...new Set(monthsList)]; // to remove duplicates
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

  async updateEntry(dataType, month, newValue) {
    console.log('this', this.financeDataList);

    //TODO: Continue with refactored logic

    // const existingEntry = this[`${dataType}ByMonth`].find(
    //   (el) => el.date === month
    // );

    // if (!existingEntry) {
    //   //POST
    //   const currencyCode = this.currencyService.selectedCurrency.code;

    //   const body = {
    //     month,
    //     value,
    //     currency_code: currencyCode,
    //   };

    //   const url = `finance_overview_data/${
    //     dataType === 'totalBalance' ? 'total_balance' : dataType
    //   }`;

    //   const response = await this.requestService.post(url, body);

    //   if (!response || !response.id) {
    //     this.notifications.error('Request error');
    //     return false;
    //   }

    //   this[`${dataType}ByMonth`].pushObject({
    //     date: month,
    //     value,
    //     currencyCode,
    //   });

    //   return true;
    // }

    // //PUT
    // const body = {
    //   value,
    //   currency_code: currencyCode,
    // };

    // const url = `finance_overview_data/${
    //   dataType === 'totalBalance' ? 'total_balance' : dataType
    // }`;

    // const response = await this.requestService.put(url, body, id);

    // if (!response || !response.id) {
    //   this.notifications.error('Request error');
    //   return false;
    // }

    // console.log('newDATA', newData);

    // existingEntry.value = value;
    // existingEntry.currency_code = currencyCode;

    // console.log('existingEntry:', existingEntry);

    // this[`${dataType}ByMonth`] = [...this[`${dataType}ByMonth`]];

    // return true;
  }
}
