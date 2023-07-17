import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class SpendingCardComponent extends Component {
  @tracked isEditBlockOpen = false;
}
