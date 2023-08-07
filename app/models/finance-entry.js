import { tracked } from '@glimmer/tracking';

export default class FinanceEntry {
  id = null;
  month = '';
  @tracked income = null;
  @tracked spendings = null;
  @tracked totalBalance = null;
  @tracked currencyCode = '';

  constructor(id, month, income, spendings, totalBalance, currencyCode) {
    this.id = id;
    this.month = month;
    this.income = income;
    this.spendings = spendings;
    this.totalBalance = totalBalance;
    this.currencyCode = currencyCode;
  }

  copy() {
    return new FinanceEntry(
      this.id,
      this.month,
      this.income,
      this.spendings,
      this.totalBalance,
      this.currencyCode
    );
  }
}
