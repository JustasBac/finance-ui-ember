import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import currencies from 'finance-ui-ember/static-data/currencies';
import { action } from '@ember/object';

export default class UserService extends Service {
  @service('requests') requestService;
  @service('saving-plan') savingPlanService;
  @service('economy') economyService;
  @service('user') userService;
  @service notifications;
  @service session;

  @tracked selectedCurrency = {};
  @tracked totalBalance = null;

  username = '';

  currencies = this.getCurrencies();

  getCurrencies() {
    currencies.forEach((currencyInfo) => {
      const { code, name, symbol } = currencyInfo;
      currencyInfo.searchableText = `${code} ${name} ${symbol}`; //in dropdown we just show currency code and a symbol, for example: EUR (€). When user hits in a search currency name "Euro" we still want to return by name too
    });

    return currencies;
  }

  async fetchAndSetUserCurrencyData() {
    const response = await this.requestService.fetch('app_currency');

    const userCurrencyCode = response['app_currency_code'];

    this.username = response['username'];

    this.selectedCurrency = this.currencies.find(
      (currency) => currency.code === userCurrencyCode
    );
  }

  async fetchAndSetUserTotalBalance() {
    const response = await this.requestService.fetch('user_total_balance');

    this.totalBalance = response['total_balance'];
  }

  async selectNewCurrency(newCurrencyCode) {
    const body = {
      app_currency_code: newCurrencyCode,
    };

    const response = await this.requestService.put('app_currency', body);

    if (response['app_currency_code']) {
      this.selectedCurrency = this.currencies.find(
        (currency) => currency.code === newCurrencyCode
      );
      return;
    }

    this.notifications.error('Request error');
  }

  @action
  getCurrencySymbol(currencyCode) {
    return this.currencies.find((currency) => currency.code === currencyCode)
      .symbol;
  }

  async createNewAccountAndLogin(username, password) {
    const body = {
      username,
      password,
    };

    const response = await this.requestService.post('register', body);

    if (!response.ok) {
      this.notifications.error(`Request error: ${response.message}`);
      return;
    }

    this.authenticate(username, password);
  }

  async authenticate(username, password) {
    try {
      await this.session.authenticate('authenticator:jwt', {
        username,
        password,
      });

      await this.requestService.loadAppData();

      return true;
      // load initial display name mapping after internal login
    } catch (e) {
      console.log('error');
      if (e.status === 401) {
        return this.notifications.error('Invalid credentials', {
          autoClear: true,
        });
      }

      this.notifications.error(`Unknown authentication error: ${e}`, {
        autoClear: true,
      });

      return false;
    }
  }
}
