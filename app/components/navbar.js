import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NavbarComponent extends Component {
  @service('user') userService;
  @service session;

  @action
  onDropdownOpen() {
    const overlay = document.querySelector('body');
    overlay.classList.add('blured');
  }

  @action
  onDropdownClose() {
    const overlay = document.querySelector('body');
    overlay.classList.remove('blured');
  }
}
