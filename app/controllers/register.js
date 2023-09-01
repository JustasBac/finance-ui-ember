import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class RegisterController extends Controller {
  @service('user') userService;
  @service('input-validation') validationService;
  @service notifications;
  @service intl;

  @tracked username = '';
  @tracked password = '';

  @action
  createAccount(e) {
    e.preventDefault(); //default behaviour: reloads page

    const { username, password } = this;

    if (!username || !password) {
      this.validationService.triggerValidation();
      return;
    }

    if (username.length <= 3 || password.length <= 3) {
      this.notifications.error(
        this.intl.t('notifications.username-and-password-length'),
        {
          autoClear: true,
        }
      );
      return;
    }

    this.userService.createNewAccountAndLogin(username, password);
  }
}
