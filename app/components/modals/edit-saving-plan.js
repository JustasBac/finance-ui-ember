import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalsEditSavingPlanComponent extends Component {
  @service notifications;

  @tracked isModalOpen = false;

  @tracked copyOfEditableSavingPlan = this.args.savingPlan.copy();

  @action
  saveChanges() {
    const {
      title,
      currencyCode,
      startDate,
      deadlineDate,
      targetAmount,
      savedAmount,
    } = this.copyOfEditableSavingPlan;

    this.args.savingPlan.title = title;
    this.args.savingPlan.currencyCode = currencyCode;
    this.args.savingPlan.startDate = startDate;
    this.args.savingPlan.deadlineDate = deadlineDate;
    this.args.savingPlan.targetAmount = targetAmount;
    this.args.savingPlan.savedAmount = savedAmount;

    this.notifications.success('Saving plan was successfully updated', {
      autoClear: true,
    });

    this.isModalOpen = false;
  }
}
