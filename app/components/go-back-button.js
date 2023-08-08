import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class GoBackButtonComponent extends Component {
  @service router;

  get previousRoute() {
    return this.router.previousRouteName;
  }

  get queryParams() {
    if (this.previousRoute === 'saving-plan-detailed-view') {
      return this.router.params['saving_plan_id'];
    }

    return null;
  }
}
