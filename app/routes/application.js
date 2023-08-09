import Route from '@ember/routing/route';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service('requests') requestService;
  @service router;
  @service session;
  @service intl;

  async beforeModel() {
    await this.session.setup();

    momentDurationFormatSetup(moment);

    if (localStorage.language) {
      const language = localStorage.getItem('language');

      this.intl.setLocale(language);
    } else {
      this.intl.setLocale('en-us');
    }

    //save previous route name in the router service. Used for <GoBackButton /> component
    this.router.on('routeDidChange', (transition) => {
      this.router.previousRouteName = transition.from?.name;
      this.router.params = transition.from?.params;
    });
  }

  async model() {
    if (this.session.isAuthenticated) {
      await this.requestService.loadAppData();
    }
  }
}
