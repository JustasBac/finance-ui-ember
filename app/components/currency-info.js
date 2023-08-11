import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CurrencyInfoComponent extends Component {
  @service('user') userService;

  get currencySymbol() {
    if (this.args.currencyCode) {
      return this.userService.getCurrencySymbol(this.args.currencyCode);
    }

    if (!Object.keys(this.userService.selectedCurrency).length) {
      return this.userService.getCurrencySymbol('EUR');
    }

    return this.userService.getCurrencySymbol(
      this.userService.selectedCurrency.code
    );
  }

  get currencyDiffersFromAppCurrency() {
    if (!this.args.currencyCode) {
      return;
    }

    return this.args.currencyCode !== this.userService.selectedCurrency.code;
  }
}
