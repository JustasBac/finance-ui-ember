import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class FinanceOverviewRoute extends Route {
  @service('economy') economyService;
  @service('currency') currencyService;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model() {
    const data = this.economyService.financeDataList;

    return data.sort((a, b) => new Date(a.month) - new Date(b.month));
  }
}
