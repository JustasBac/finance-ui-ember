import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';

export default class SavingPlanDetailedViewController extends Controller {
  @service('user') userService;
  @service intl;

  @tracked activeTab = 'planning'; //default

  get currencySymbol() {
    return this.userService.getCurrencySymbol(this.model.currencyCode);
  }

  get timeFromStartDate() {
    const start = this.model.startDate;
    const today = moment();

    if (moment(start).isSame(today, 'day')) {
      // if saving plan starts today
      return this.intl.t('saving-plan-detail-page.today');
    }

    let format = this.intl.t(
      'saving-plan-detail-page.time-from-start-date-format'
    );
    let duration = moment.duration(today.diff(start), 'ms');

    if (moment(start).isAfter(today)) {
      //if saving plan starts in future
      format = this.intl.t(
        'saving-plan-detail-page.time-until-deadline-format'
      );

      duration = moment.duration(start.diff(today), 'ms');
    }

    if (duration._data.days === 0 && duration._data.seconds > 0) {
      // if saving plan starts today
      return this.intl.t('saving-plan-detail-page.tomorrow');
    }

    return duration.format(format, { trim: 'both' });
  }

  get timeUntilDeadline() {
    const now = moment();
    const end = moment(this.model.deadlineDate);
    const duration = moment.duration(end.diff(now), 'ms');
    const format = this.intl.t(
      'saving-plan-detail-page.time-until-deadline-format'
    );

    return duration.format(format, { trim: 'both' });
  }

  get remainingAmountToSave() {
    const { targetAmount, startingCapital, totalSavings } = this.model;

    const remainingAmount = targetAmount - startingCapital - totalSavings;

    if (remainingAmount < 0) {
      return 0;
    }

    return remainingAmount;
  }
}
