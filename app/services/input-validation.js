import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
export default class InputValidationService extends Service {
  @tracked validationWasTriggered = false;
  @service intl;
  @service notifications;

  triggerValidation() {
    this.validationWasTriggered = true;
    this.notifications.error(
      this.intl.t('notifications.make-sure-all-are-filled'),
      {
        autoClear: true,
      }
    );
  }
}
