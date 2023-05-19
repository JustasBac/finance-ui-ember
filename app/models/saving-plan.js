import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class SavingPlan {
  @tracked title;
  @tracked goalAmount;
  @tracked currency;
  @tracked deadlineDate;

  constructor(
    title = '',
    goalAmount = null,
    currency = '',
    deadlineDate = moment().add(1, 'days')
  ) {
    this.title = title;
    this.goalAmount = goalAmount;
    this.currency = currency;
    this.deadlineDate = deadlineDate;
  }

  copy() {
    return new SavingPlan(
      this.title,
      this.goalAmount,
      this.currency,
      this.deadlineDate
    );
  }
}
