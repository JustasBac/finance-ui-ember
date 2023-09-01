import Component from '@glimmer/component';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';
export default class DatePickerComponent extends Component {
  @service notifications;
  @service intl;

  @action
  changeDate(date) {
    if (
      !this.args.allowToSelectDayInThePast &&
      moment(date.moment).isBefore(moment())
    ) {
      this.notifications.error(
        this.intl.t('notifications.only-future-day-allowed'),
        {
          autoClear: true,
        }
      );
      return;
    }

    // this.selectedDate = date.moment;
    this.args.onDateChange(date.moment);
  }
}
