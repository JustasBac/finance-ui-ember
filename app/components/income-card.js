import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class IncomeCardComponent extends Component {
  @tracked isEditBlockOpen = false;
}
