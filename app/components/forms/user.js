import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class FormsUserComponent extends Component {
  @service('input-validation') validationService;

  @action
  resetFormValidations() {
    this.validationService.validationWasTriggered = false;
  }
}
