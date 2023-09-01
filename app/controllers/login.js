import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service('input-validation') validationService;
  @service('user') userService;

  @tracked username = '';
  @tracked password = '';

  @action
  signIn(e) {
    e.preventDefault(); //default behaviour: reloads page

    const { username, password } = this;

    if (!username || !password) {
      this.validationService.triggerValidation();
      return;
    }

    this.userService.authenticate(username, password);
  }

  @action
  loginWithDemoUser() {
    this.userService.authenticate('demo-user', 'demo');
  }
}
