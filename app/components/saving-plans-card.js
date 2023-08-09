import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SavingPlansCardComponent extends Component {
  @service('saving-plan') savingPlanService;
  @service('user') userService;
  @service('requests') requestService;
}
