import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service('input-validation') validationService;
  @service notifications;
  @service('authentication') authenticationService;

  @tracked username = '';
  @tracked password = '';

  @action
  signIn() {
    const { username, password } = this;

    if (!username || !password) {
      this.validationService.validationWasTriggered = true;
      this.notifications.error('Make sure all fields are filled!', {
        autoClear: true,
      });
      return;
    }

    this.authenticationService.authenticate(username, password);
  }
}
