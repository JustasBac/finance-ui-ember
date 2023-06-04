import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalsEditMonthSavingsComponent extends Component {
  @tracked savedAmount = this.args.monthInfo.savedAmount;
  @tracked isModalOpen = false;

  @action
  closeModalAndUpdateDatabase() {
    this.isModalOpen = false;

    //TODO: API Connection to update savedAmount
  }
}
