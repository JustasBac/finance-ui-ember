import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CurrencyInfoComponent extends Component {
  @service('user') userService;

  get currencySymbol() {
    return this.userService.getCurrencySymbol(this.args.currencyCode);
  }

  get currencyDiffersFromAppCurrency() {
    return this.args.currencyCode !== this.userService.selectedCurrency.code;
  }
}
