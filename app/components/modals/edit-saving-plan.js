import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalsEditSavingPlanComponent extends Component {
  @service notifications;

  @tracked copyOfEditableSavingPlan = this.args.savingPlan.copy();
  @tracked isModalOpen = false;

  @action
  saveChanges() {
    const { title, currency, deadlineDate, goalAmount } =
      this.copyOfEditableSavingPlan;

    this.args.savingPlan.title = title;
    this.args.savingPlan.currency = currency;
    this.args.savingPlan.deadlineDate = deadlineDate;
    this.args.savingPlan.goalAmount = goalAmount;

    this.notifications.success('Saving plan was successfully updated', {
      autoClear: true,
    });

    this.isModalOpen = false;
  }
}
