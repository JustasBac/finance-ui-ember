import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import moment from 'moment';

export default class SavingPlansTableComponent extends Component {
  @service('saving-plan') savingPlanService;
  @service('currency') currencyService;

  @action
  calculateMonthlySavingsNeeded(savingPlanInfo) {
    const { deadlineDate, targetAmount, currencyCode } = savingPlanInfo;

    const differenceFromNowUntilDeadline = deadlineDate.diff(
      moment(),
      'months'
    );

    const amountToSavePerMonth = targetAmount / differenceFromNowUntilDeadline;
    const savingPlanCurrencySymbol = this.getCurrencySymbol(currencyCode);

    return `${Math.round(
      amountToSavePerMonth
    )} ${savingPlanCurrencySymbol}/month`;
  }

  @action
  getCurrencySymbol(currencyCode) {
    return this.currencyService.currencies.find(
      (currency) => currency.code === currencyCode
    ).symbol;
  }

  getTimeUntilDeadline(deadlineDate) {
    const now = moment();
    const end = moment(deadlineDate);
    const duration = moment.duration(end.diff(now), 'ms');

    return moment.duration(duration).format();
  }
}
