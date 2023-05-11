import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class InputComponent extends Component {
  @service('input-validation') validationService;

  get type() {
    if (this.args.type) {
      return this.args.type;
    }

    return 'text';
  }

  @computed('validationService.validationWasTriggered')
  get isFormValidated() {
    if (!this.validationService.validationWasTriggered) {
      return true;
    }

    if (!this.args.value || this.args.value.length === 0) {
      console.log('length is zero');

      return false;
    }

    return true;
  }

  @action
  updateInputValue(e) {
    this.args.onInput(e.target.value);
  }
}
