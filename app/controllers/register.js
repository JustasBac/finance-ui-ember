import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RegisterController extends Controller {
  @service('user') userService;

  @action
  createAccount(e) {
    e.preventDefault(); //default behaviour: reloads page

    this.userService.createNewAccountAndLogin(this.username, this.password);
  }
}
