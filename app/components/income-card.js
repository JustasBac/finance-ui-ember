import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IncomeCardComponent extends Component {
  @service('currency') currencyService;

  @tracked isEditBlockOpen = false;
  @tracked currentMonthIncome = 2900;
}
