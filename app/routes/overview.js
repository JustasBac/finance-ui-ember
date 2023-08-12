import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class OverviewRoute extends Route {
  @service('requests') requestService;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
}
