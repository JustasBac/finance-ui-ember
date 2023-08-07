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

  @action
  saveChanges() {
    this.isModalOpen = false;

    if (
      this.args.data.income === this.copiedData.income &&
      this.args.data.spendings === this.copiedData.spendings &&
      this.args.data.totalBalance === this.copiedData.totalBalance &&
      this.args.data.currencyCode === this.copiedData.currencyCode
    ) {
      return;
    }

    this.args.onSave(this.copiedData);
  }
}
