import Route from '@ember/routing/route';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service router;
  @service requests;
  @service session;

  async beforeModel() {
    await this.session.setup();

    momentDurationFormatSetup(moment);

    //save previous route name in the router service. Used for <GoBackButton /> component
    this.router.on('routeDidChange', (transition) => {
      this.router.previousRouteName = transition.from?.name;
    });

    // this.requests.fetch('saving_plans');
  }
}
