import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class HomeController extends Controller {
  @service('economy') economyService;
  @service('currency') currencyService;

  @action
  updateLatestMonthIncome(newValue) {
    this.economyService.incomeByMonth[
      this.economyService.incomeByMonth.length - 1
    ].value = newValue;

    this.economyService.incomeByMonth = [...this.economyService.incomeByMonth];

    //TODO: api call
  }

  @action
  updateLatestMonthSpendings(newValue) {
    this.economyService.spendingsByMonth[
      this.economyService.spendingsByMonth.length - 1
    ].value = newValue;

    this.economyService.spendingsByMonth = [
      ...this.economyService.spendingsByMonth,
    ];

    //TODO: api call
  }

  @action
  updateLatestTotalBalance({ date, value }) {
    const { totalBalanceByMonth } = this.economyService;

    const existingEntry = totalBalanceByMonth.find((el) => el.date === date);

    if (!existingEntry) {
      const currencyCode = this.currencyService.selectedCurrency.code;

      this.economyService.totalBalanceByMonth.pushObject({
        date,
        value,
        currencyCode,
      });

      return;
    }

    existingEntry.value = value;

    this.economyService.totalBalanceByMonth = [...totalBalanceByMonth];

    //TODO: api call
  }
}
