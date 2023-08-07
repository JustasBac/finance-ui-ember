import { tracked } from '@glimmer/tracking';

export default class FinanceEntry {
  month = '';
  @tracked income = null;
  @tracked spendings = null;
  @tracked totalBalance = null;
  @tracked currencyCode = '';

  constructor(month, income, spendings, totalBalance, currencyCode) {
    this.month = month;
    this.income = income;
    this.spendings = spendings;
    this.totalBalance = totalBalance;
    this.currencyCode = currencyCode;
  }
}
