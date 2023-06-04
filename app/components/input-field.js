import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class InputFieldComponent extends Component {
  @service('input-validation') validationService;

  get type() {
    if (this.args.type) {
      return this.args.type;
    }

    return 'text'; //default
  }

  @computed('args.value.length', 'validationService.validationWasTriggered')
  get isFormValidated() {
    if (!this.validationService.validationWasTriggered) {
      return true;
    }

    if (!this.args.value || this.args.value.length === 0) {
      return false;
    }

    return true;
  }

  @action
  updateInputValue(e) {
    if (this.type === 'number' && e.target.value < this.args.min) {
      //if input has type 'number' prevent user from entering value lower than allowed min value
      e.target.value = null;
      return;
    }

    this.args.onInput(e.target.value);
  }
}
