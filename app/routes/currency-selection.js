import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default class CurrencySelectionRoute extends Route {
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
}
