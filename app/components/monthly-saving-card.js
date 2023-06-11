import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { roundNumber } from 'finance-ui-ember/helpers/round-number';
import moment from 'moment';

export default class MonthlySavingCardComponent extends Component {
  @computed('args.monthInfo.savedAmount')
  get progressPercentage() {
    //if u are expected to save 1000EUR but saved only 500EUR than you saved -50%

    const { savedAmount, targetSavings } = this.args.monthInfo;

    if (!savedAmount) {
      return;
    }

    const difference = (+savedAmount * 100) / +targetSavings - 100;

    const roundedDifference = roundNumber(difference, 2); //round to 2 decimals

    if (Math.round(savedAmount) === Math.round(targetSavings)) {
      //we show rounded target with no decimals, so when a user enters saved amount that matches with rounded target amount we don't show any %
      return;
    }

    return difference > 0 ? `+${roundedDifference}` : roundedDifference; //minus is automatically added to a negative value
  }

  get isCurrentMonth() {
    const currentMonth = moment().format('MMMM YYYY'); //now

    return currentMonth === this.args.monthInfo.formatedDate;
  }

  get isEditAllowed() {
    //don't allow to edit your savings for months that are in the future
    return moment().isAfter(this.args.monthInfo.formatedDate, 'MMMM YYYY');
  }
}
