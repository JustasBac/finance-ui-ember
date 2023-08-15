import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class TotalBalanceComponent extends Component {
  @service('user') userService;
  @service('requests') requestService;
  @service('finance') financeService;

  get currentMonthTotalBalance() {
    const currentMonth = moment().format('MMMM YYYY');

    const matchingMonth = this.financeService.financeDataList.find(
      (el) => moment(el.datetime).format('MMMM YYYY') === currentMonth
    );

    if (!matchingMonth) {
      return this.userService.initialTotalBalance === null
        ? '-'
        : this.userService.initialTotalBalance;
    }

    return matchingMonth.updatedTotalBalance;
  }
}
