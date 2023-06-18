import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SpendingCardComponent extends Component {
  @service('currency') currencyService;

  @tracked isEditBlockOpen = false;
  @tracked currentMonthSpending = 900;
}
