import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class SavingPlan {
  id;
  @tracked title;
  @tracked targetAmount;
  @tracked currencyCode;
  @tracked startDate;
  @tracked deadlineDate;
  @tracked savingsPerMonth = [];
  @tracked startingCapital;
  @tracked monthsListUntilDeadline = [];

  constructor(
    id = 0,
    title = '',
    targetAmount = null,
    currencyCode = '',
    startDate = moment(),
    deadlineDate = moment().add(1, 'days'),
    savingsPerMonth = [],
    startingCapital = 0
  ) {
    this.id = id;
    this.title = title;
    this.targetAmount = targetAmount;
    this.currencyCode = currencyCode;
    this.startDate = startDate;
    this.deadlineDate = deadlineDate;
    this.savingsPerMonth = savingsPerMonth;
    this.startingCapital = startingCapital;
    this.monthsListUntilDeadline = this.getMonthsUntilDeadline();
  }

  copy() {
    return new SavingPlan(
      this.id,
      this.title,
      this.targetAmount,
      this.currencyCode,
      this.startDate,
      this.deadlineDate,
      this.savingsPerMonth,
      this.startingCapital,
      this.monthsListUntilDeadline
    );
  }

  getMonthsUntilDeadline() {
    // we need to clone the dates (comes from momentjs) so the dates don't get changed (because of two way binding):
    const stardDateClone = this.startDate.clone();
    const endDateClone = this.deadlineDate.clone();

    const betweenMonths = [];

    if (stardDateClone < endDateClone) {
      const date = stardDateClone.startOf('month');

      while (date < endDateClone.endOf('month')) {
        const monthlySavings = this.savingsPerMonth.find(
          (el) => el.month === moment(date).format('MMMM YYYY')
        )?.amountSaved;

        betweenMonths.push({
          date: date.format('MMMM YYYY'),
          momentObject: moment(date),
          savedAmount: monthlySavings ? monthlySavings : 0,
        });
        date.add(1, 'month');
      }
    }

    return betweenMonths;
  }
}
