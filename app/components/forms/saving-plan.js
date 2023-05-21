import Component from '@glimmer/component';

export default class FormsSavingPlanComponent extends Component {
  get title() {
    const title = this.args.savingPlanInformation.title;

    console.log('title', title);
    return title;
  }
}
