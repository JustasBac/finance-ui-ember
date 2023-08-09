import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import moment from 'moment';

export default class SavingPlansTableComponent extends Component {
  @service('saving-plan') savingPlanService;
  @service('user') userService;

  @action
  calculateMonthlySavingsNeeded(savingPlanInfo) {
    const { deadlineDate, targetAmount, currencyCode } = savingPlanInfo;

    const differenceFromNowUntilDeadline = deadlineDate.diff(
      moment(),
      'months',
      true // return a floating point number instead of an integer
    );

    const amountToSavePerMonth = targetAmount / differenceFromNowUntilDeadline;
    const savingPlanCurrencySymbol =
      this.userService.getCurrencySymbol(currencyCode);

    return `${Math.round(
      amountToSavePerMonth
    )} ${savingPlanCurrencySymbol}/month`;
  }

  @action
  calculateDailySavingsNeeded(savingPlanInfo) {
    const { deadlineDate, targetAmount, currencyCode } = savingPlanInfo;

    const differenceFromNowUntilDeadline = deadlineDate.diff(moment(), 'days');

    const amountToSavePerDay = targetAmount / differenceFromNowUntilDeadline;
    const savingPlanCurrencySymbol =
      this.userService.getCurrencySymbol(currencyCode);

    return `${Math.round(amountToSavePerDay)} ${savingPlanCurrencySymbol}/day`;
  }

  getTimeUntilDeadline(deadlineDate) {
    const now = moment();
    const end = moment(deadlineDate);
    const duration = moment.duration(end.diff(now), 'ms');

    return moment.duration(duration).format();
  }
}
