import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class HeroSectionComponent extends Component {
  @service('darkMode') darkModeService;

  get imageSrc() {
    if (this.darkModeService.activeTheme === 'dark') {
      return '/assets/images/dashboard_dark.png';
    }

    return '/assets/images/dashboard_light.png';
  }
}
