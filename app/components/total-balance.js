import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class TotalBalanceComponent extends Component {
  @service('currency') currencyService;

  @tracked isEditBlockOpen = false;
  @tracked totalBalance = 37000;
}
