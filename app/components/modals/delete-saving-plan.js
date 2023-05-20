import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ModalsDeleteSavingPlanComponent extends Component {
  @service('saving-plan') savingPlanService;
  @service notifications;

  @tracked isModalOpen = false;

  @action
  deleteSavingPlan() {
    this.savingPlanService.savingPlans.removeObject(this.args.savingPlan);

    this.notifications.success('Saving plan was deleted', {
      autoClear: true,
    });

    this.isModalOpen = false;
  }
}
