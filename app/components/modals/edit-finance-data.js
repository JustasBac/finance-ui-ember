import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalsEditFinanceDataComponent extends Component {
  @tracked isModalOpen = false;
  @tracked copiedData = { ...this.args.data };

  @action
  resetEditableValuesToDefault() {
    this.copiedData = { ...this.args.data };
  }
}
