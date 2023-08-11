import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class SavingPlansCardComponent extends Component {
  @service('saving-plan') savingPlanService;
  @service('user') userService;
  @service('requests') requestService;

  @action
  progressPercentage(savingPlanData) {
    const { startingCapital, totalSavings, targetAmount } = savingPlanData;

    return ((+startingCapital + +totalSavings) * 100) / +targetAmount;
  }
}
