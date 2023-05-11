import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DatePickerComponent extends Component {
  @tracked selectedDate = this.args.selectedDate;

  @action
  changeDate(date) {
    this.selectedDate = date.moment;
    this.args.onDateChange(date.moment);
  }
}
