import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class SpendingCardComponent extends Component {
  @service('finance') financeService;
  @service('requests') requestService;

  get currentMonthSpendings() {
    const currentMonth = moment().format('MMMM YYYY');

    const matchingMonth = this.financeService.financeDataList.find(
      (el) => moment(el.datetime).format('MMMM YYYY') === currentMonth
    );

    return matchingMonth?.spendings;
  }
}
