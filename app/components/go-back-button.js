import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class GoBackButtonComponent extends Component {
  @service router;

  get link() {
    return this.router.previousRouteName
      ? this.router.previousRouteName
      : 'home'; //if there is no previous route, then redirect to 'home'
  }
}
