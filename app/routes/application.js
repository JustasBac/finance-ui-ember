import Route from '@ember/routing/route';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

export default class ApplicationRoute extends Route {
  beforeModel() {
    momentDurationFormatSetup(moment);
  }
}
