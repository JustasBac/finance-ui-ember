import { tracked } from '@glimmer/tracking';

export default class FinanceEntry {
  id = null;
  datetime = '';
  initialTotalBalance = null;
  @tracked income = null;
  @tracked spendings = null;
  @tracked updatedTotalBalance = null;
  @tracked currencyCode = '';

  constructor(
    id,
    datetime,
    income,
    spendings,
    initialTotalBalance,
    updatedTotalBalance,
    currencyCode
  ) {
    this.id = id;
    this.datetime = datetime;
    this.income = +income || null;
    this.spendings = +spendings || null;
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
      this.datetime,
      this.income,
      this.spendings,
      this.initialTotalBalance,
      this.updatedTotalBalance,
      this.currencyCode
    );
  }
}
