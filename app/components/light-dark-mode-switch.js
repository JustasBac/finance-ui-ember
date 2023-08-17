import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class LightDarkModeSwitchComponent extends Component {
  @service('darkMode') darkModeService;
}
