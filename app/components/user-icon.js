import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class UserIconComponent extends Component {
  @service session;
  @service('user') userService;

  @action
  logout() {
    this.session.invalidate();
  }
}
