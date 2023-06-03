import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class SavingPlan {
  id;
  @tracked title;
  @tracked targetAmount;
  @tracked currencyCode;
  @tracked startDate;
  @tracked deadlineDate;
  @tracked savedAmount;

  constructor(
    id = 0,
    title = '',
    targetAmount = null,
    currencyCode = '',
    startDate = moment(),
    deadlineDate = moment().add(1, 'days'),
    savedAmount = 0
  ) {
    this.id = id;
    this.title = title;
    this.targetAmount = targetAmount;
    this.currencyCode = currencyCode;
    this.startDate = startDate;
    this.deadlineDate = deadlineDate;
    this.savedAmount = savedAmount;
  }

  copy() {
    return new SavingPlan(
      this.id,
      this.title,
      this.targetAmount,
      this.currencyCode,
      this.startDate,
      this.deadlineDate,
      this.savedAmount
    );
  }
}
