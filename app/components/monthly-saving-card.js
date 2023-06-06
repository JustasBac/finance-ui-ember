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

    const roundedDifference =
      Math.round((difference + Number.EPSILON) * 100) / 100;

    if (Math.round(savedAmount) === Math.round(targetSavings)) {
      return;
    }

    return difference > 0 ? `+${roundedDifference}` : roundedDifference; //minus is automatically added to a negative value
  }
}
