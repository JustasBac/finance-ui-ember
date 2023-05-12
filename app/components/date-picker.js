import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class DatePickerComponent extends Component {
  @service notifications;

  @tracked selectedDate = this.args.selectedDate;

  @action
  changeDate(date) {
    if (moment(date.moment).isBefore(moment())) {
      this.notifications.error('Only a future date is allowed', {
        autoClear: true,
      });
      return;
    }

    this.selectedDate = date.moment;
    this.args.onDateChange(date.moment);
  }
}
