import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class SavingPlan {
  @tracked title;
  @tracked targetAmount;
  @tracked currencyCode;
  @tracked deadlineDate;

  constructor(
    title = '',
    targetAmount = null,
    currencyCode = '',
    deadlineDate = moment().add(1, 'days')
  ) {
    this.title = title;
    this.targetAmount = targetAmount;
    this.currencyCode = currencyCode;
    this.deadlineDate = deadlineDate;
  }

  copy() {
    return new SavingPlan(
      this.title,
      this.targetAmount,
      this.currencyCode,
      this.deadlineDate
    );
  }
}
