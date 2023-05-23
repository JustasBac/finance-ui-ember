import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class SavingPlan {
  @tracked title;
  @tracked goalAmount;
  @tracked currencyCode;
  @tracked deadlineDate;

  constructor(
    title = '',
    goalAmount = null,
    currencyCode = '',
    deadlineDate = moment().add(1, 'days')
  ) {
    this.title = title;
    this.goalAmount = goalAmount;
    this.currencyCode = currencyCode;
    this.deadlineDate = deadlineDate;
  }

  copy() {
    return new SavingPlan(
      this.title,
      this.goalAmount,
      this.currencyCode,
      this.deadlineDate
    );
  }
}
