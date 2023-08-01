import Component from '@glimmer/component';

export default class AlertComponent extends Component {
  get type() {
    if (this.args.type) {
      return `alert-${this.args.type}`;
    }

    return 'alert-warning';
  }
}
