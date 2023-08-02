import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ModalsEditMonthSavingsComponent extends Component {
  @service('saving-plan') savingPlanService;

  @tracked savedAmount = this.args.monthInfo.savedAmount;
  @tracked isModalOpen = false;

  @action
  closeModalAndUpdateDatabase() {
    this.isModalOpen = false;

    console.log('this.args.monthInfo', this.args.monthInfo);

    this.savingPlanService.addMonthlySavings(
      this.args.savingPlan,
      this.args.monthInfo,
      this.savedAmount
    );
  }
}
