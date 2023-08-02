import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ModalsDeleteSavingPlanComponent extends Component {
  @service('saving-plan') savingPlanService;
  @service notifications;
  @service router;

  @tracked isModalOpen = false;

  @action
  async deleteSavingPlan() {
    const response = await this.savingPlanService.deleteSavingPlan(
      this.args.savingPlan
    );

    if (!response) {
      return;
    }

    this.isModalOpen = false;
    this.router.transitionTo('home');
  }
}
