import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalsEditMonthSavingsComponent extends Component {
  @tracked savedAmount = this.args.monthInfo.savedAmount;
  @tracked isModalOpen = false;

  @action
  closeModalAndUpdateDatabase() {
    this.isModalOpen = false;

    const { savingPlan } = this.args;

    //TODO: API Connection to update savedAmount

    const monthThatAlreadyHasSavedAmount = savingPlan.savingsPerMonth.find(
      (el) => el.month === this.args.monthInfo.formatedDate
    );

    if (monthThatAlreadyHasSavedAmount) {
      monthThatAlreadyHasSavedAmount.amountSaved = +this.savedAmount;
    } else {
      savingPlan.savingsPerMonth.pushObject({
        month: this.args.monthInfo.formatedDate,
        amountSaved: +this.savedAmount,
      });
    }

    savingPlan.totalBalance = savingPlan.calculateTotalBalance();
  }
}
