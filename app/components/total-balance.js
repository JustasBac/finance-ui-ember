import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class TotalBalanceComponent extends Component {
  @tracked isEditBlockOpen = false;
  @tracked totalBalance = this.getLatestTotalBalance();

  getLatestTotalBalance() {
    const { data } = this.args;
    const latestMonthInfo = data[data.length - 1];

    if (!latestMonthInfo) {
      return 0;
    }

    return latestMonthInfo.value;
  }

  @action
  onChange(newValue) {
    this.args.onChange(+newValue);
    this.totalBalance = +newValue;
  }
}
