import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class InputValidationService extends Service {
  @tracked validationWasTriggered = false;
}
