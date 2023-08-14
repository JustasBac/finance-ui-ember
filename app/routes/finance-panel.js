import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class FinancePanelRoute extends Route {
  @service('finance') financeService;
  @service('user') userService;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model() {
    return this.financeService.financeDataList;
  }
}
