import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ModalsEditFinanceDataComponent extends Component {
  @service('input-validation') validationService;

  @tracked isModalOpen = false;
  @tracked copiedData = this.args.data.copy();

  @action
  resetEditableValuesToDefault() {
    this.copiedData = this.args.data.copy();
  }

  @action
  saveChanges() {
    const { income, spendings, currencyCode, initialTotalBalance } =
      this.copiedData;

    if (!income || !spendings) {
      this.validationService.triggerValidation();
      return;
    }

    this.isModalOpen = false;

    if (
      this.args.data.income === income &&
      this.args.data.spendings === spendings &&
      this.args.data.currencyCode === currencyCode
    ) {
      return;
    }

    const updatedTotalBalance = initialTotalBalance + (income - spendings); //recalculate total balance

    this.copiedData.totalBalanceDifferenceFromTheLastValue =
      updatedTotalBalance - this.copiedData.updatedTotalBalance;
    this.copiedData.updatedTotalBalance = updatedTotalBalance;

    this.args.onSave(this.copiedData);
  }
}
