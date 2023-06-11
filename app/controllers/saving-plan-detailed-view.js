import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';

export default class SavingPlanDetailedViewController extends Controller {
  @service('currency') currencyService;

  @tracked activeTab = 'planning'; //default

  get currency() {
    return this.currencyService.getCurrencySymbol(this.model.currencyCode);
  }

  get timeFromStartDate() {
    const start = this.model.startDate;
    const end = moment();
    const duration = moment.duration(end.diff(start), 'ms');
    const format = `Y [years] M [months] d [days]`;

    return duration.format(format, { trim: 'both' });
  }

  get timeUntilDeadline() {
    const now = moment();
    const end = moment(this.model.deadlineDate);
    const duration = moment.duration(end.diff(now), 'ms');
    const format = `Y [years] M [months] d [days]`;

    return duration.format(format, { trim: 'both' });
  }
}
