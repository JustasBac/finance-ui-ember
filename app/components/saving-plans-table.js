import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SavingPlansTableComponent extends Component {
  @service('saving-plan') savingPlanService;
}
