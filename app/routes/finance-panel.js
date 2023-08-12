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
    const data = this.financeService.financeDataList;

    return data.sort((a, b) => new Date(a.month) - new Date(b.month));
  }
}
