import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ModalsEditSavingPlanComponent extends Component {
  @service('saving-plan') savingPlanService;
  @service notifications;
  @service intl;

  @tracked isModalOpen = false;
  @tracked copyOfEditableSavingPlan = this.args.savingPlan.copy();

  @action
  async saveChanges() {
    const response = await this.savingPlanService.updateSavingPlan(
      this.copyOfEditableSavingPlan
    );

    if (!response) {
      return;
    }

    const {
      title,
      currencyCode,
      startDate,
      deadlineDate,
      targetAmount,
      startingCapital,
    } = this.copyOfEditableSavingPlan;

    this.args.savingPlan.title = title;
    this.args.savingPlan.currencyCode = currencyCode;
    this.args.savingPlan.startDate = startDate;
    this.args.savingPlan.deadlineDate = deadlineDate;
    this.args.savingPlan.targetAmount = targetAmount;
    this.args.savingPlan.startingCapital = startingCapital;

    this.args.savingPlan.monthsListUntilDeadline =
      this.args.savingPlan.getMonthsListUntilDeadline();

    this.notifications.success(
      this.intl.t('notifications.saving-plan-updated'),
      {
        autoClear: true,
      }
    );

    this.isModalOpen = false;
  }
}
