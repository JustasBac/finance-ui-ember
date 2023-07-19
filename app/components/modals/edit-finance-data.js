import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ModalsEditFinanceDataComponent extends Component {
  @service notifications;

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
      this.args.data.totalBalance === this.copiedData.totalBalance
    ) {
      return;
    }

    this.args.onSave(this.copiedData);
    this.notifications.success(
      `Changes for ${this.copiedData.date} were saved`,
      {
        autoClear: true,
      }
    );
  }
}
