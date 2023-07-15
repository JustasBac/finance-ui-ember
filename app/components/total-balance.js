import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class TotalBalanceComponent extends Component {
  @service('currency') currencyService;

  @tracked isEditBlockOpen = false;
  @tracked totalBalance = this.getLatestTotalBalance();

  getLatestTotalBalance() {
    console.log('this.a', this.args.data);
    const latestMonthInfo = this.args.data?.pop();

    if (!latestMonthInfo) {
      return 0;
    }

    console.log('latestMonthInfo', latestMonthInfo);
    return latestMonthInfo.value;
  }
}
