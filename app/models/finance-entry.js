import { tracked } from '@glimmer/tracking';

export default class FinanceEntry {
  id = null;
  month = '';
  initialTotalBalance = null;
  @tracked income = null;
  @tracked spendings = null;
  @tracked updatedTotalBalance = null;
  @tracked currencyCode = '';

  constructor(
    id,
    month,
    income,
    spendings,
    initialTotalBalance,
    updatedTotalBalance,
    currencyCode
  ) {
    this.id = id;
    this.month = month;
    this.income = +income;
    this.spendings = +spendings;
    this.initialTotalBalance = +initialTotalBalance;
    this.updatedTotalBalance = +updatedTotalBalance;
    this.currencyCode = currencyCode;
  }

  get savings() {
    return this.income - this.spendings;
  }

  copy() {
    return new FinanceEntry(
      this.id,
      this.month,
      this.income,
      this.spendings,
      this.initialTotalBalance,
      this.updatedTotalBalance,
      this.currencyCode
    );
  }
}
