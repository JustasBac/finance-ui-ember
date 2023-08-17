import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DarkModeService extends Service {
  @tracked activeTheme = '';

  setUserTheme() {
    const html = document.querySelector('html');

    if (localStorage.theme === 'dark') {
      html.classList.add('dark');
      localStorage.theme = 'dark';
      this.activeTheme = 'dark';
      return;
    }

    html.classList.add('light');
    localStorage.theme = 'light';
    this.activeTheme = 'light';
  }

  @action
  changeTheme() {
    const html = document.querySelector('html');

    if (localStorage.theme === 'light') {
      html.classList.remove('light');
      html.classList.add('dark');
      localStorage.theme = 'dark';
      this.activeTheme = 'dark';

      return;
    }

    html.classList.remove('dark');
    html.classList.add('light');
    localStorage.theme = 'light';
    this.activeTheme = 'light';
  }
}
