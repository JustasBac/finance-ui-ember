import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CurrencyChooseDropdownComponent extends Component {
  @service('currency') currencyService;
}
