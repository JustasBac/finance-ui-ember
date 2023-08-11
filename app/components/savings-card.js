import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SavingsCardComponent extends Component {
  @service('economy') economyService;
  @service('user') userService;

  get data() {
    return this.economyService.getCurrentMonthsData();
  }

  get currencySymbol() {
    return this.userService.getCurrencySymbol(this.data.currencyCode);
  }
}
