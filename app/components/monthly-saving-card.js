import Component from '@glimmer/component';
import { computed } from '@ember/object';
export default class MonthlySavingCardComponent extends Component {
  @computed('args.monthInfo.savedAmount')
  get progressPercentage() {
    //if u are expected to save 1000EUR but saved only 500EUR than you saved -50%

    const { savedAmount, targetSavings } = this.args.monthInfo;

    if (!savedAmount) {
      return;
    }

    const difference = (+savedAmount * 100) / +targetSavings - 100;

    return difference > 0
      ? `+${Math.round(difference)}%`
      : `${Math.round(difference)}%`; //minus is automatically added because the difference is negative
  }
}
