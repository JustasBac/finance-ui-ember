import Route from '@ember/routing/route';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service('saving-plan') savingPlanService;
  @service('economy') economyService;
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
  }

  async model() {
    if (this.session.isAuthenticated) {
      await this.savingPlanService.fetchAndSetSavingPlans();
      await this.economyService.fetchAndSetFinanceData();
    }
  }
}
