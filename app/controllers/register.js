import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class RegisterController extends Controller {
  @service('user') userService;
  @service('input-validation') validationService;
  @service notifications;

  @tracked username = '';
  @tracked password = '';

  @action
  createAccount(e) {
    e.preventDefault(); //default behaviour: reloads page

    const { username, password } = this;

    if (!username || !password) {
      this.validationService.validationWasTriggered = true;
      this.notifications.error('Make sure all fields are filled!', {
        autoClear: true,
      });
      return;
    }

    this.userService.createNewAccountAndLogin(username, password);
  }
}
