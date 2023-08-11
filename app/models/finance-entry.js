import { tracked } from '@glimmer/tracking';

export default class FinanceEntry {
  id = null;
  month = '';
  @tracked income = null;
  @tracked spendings = null;
  @tracked currencyCode = '';

  constructor(id, month, income, spendings, currencyCode) {
    this.id = id;
    this.month = month;
    this.income = +income;
    this.spendings = +spendings;
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
      this.currencyCode
    );
  }
}
