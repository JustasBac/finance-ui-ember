import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
export default class LanguageSwitchButtonComponent extends Component {
  @service intl;
  @service moment;

  @action
  registerElement(element) {
    this.element = element;
  }

  @action
  switchLanguage(locale) {
    this.intl.setLocale(locale);

    localStorage.setItem('language', locale);
    this.moment.setLocale(locale.split('-')[0]); //de-de ----> de

    this.element.removeAttribute('open'); //force dropdown to close
  }
}
