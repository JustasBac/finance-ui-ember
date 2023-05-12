import { tracked } from '@glimmer/tracking';

export default class SavingPlan {
  @tracked title;
  @tracked goalAmount;
  @tracked currency;
  @tracked deadlineDate;

  constructor(title, goalAmount, currency, deadlineDate) {
    this.title = title;
    this.goalAmount = goalAmount;
    this.currency = currency;
    this.deadlineDate = deadlineDate;
  }
}
