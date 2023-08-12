import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SavingsCardComponent extends Component {
  @service('finance') financeService;
  @service('user') userService;

  get data() {
    return this.financeService.getCurrentMonthsData();
  }

  get currencySymbol() {
    return this.userService.getCurrencySymbol(this.data.currencyCode);
  }
}
