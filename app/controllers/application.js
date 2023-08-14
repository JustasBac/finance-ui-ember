import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service router;

  get isCurrentRouteLoginOrRegister() {
    const { currentRouteName } = this.router;

    if (currentRouteName === 'login' || currentRouteName === 'register') {
      return true;
    }

    return false;
  }
}
