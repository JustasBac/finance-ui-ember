import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import currencies from 'finance-ui-ember/static-data/currencies';
import { action } from '@ember/object';
import moment from 'moment';

export default class UserService extends Service {
  @service('requests') requestService;
  @service('saving-plan') savingPlanService;
  @service('finance') financeService;
  @service('user') userService;
  @service notifications;
  @service session;

  @tracked selectedCurrency = {};
  @tracked initialTotalBalance = null;

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

  async fetchAndSetUserInitialTotalBalance() {
    const response = await this.requestService.fetch(
      'user_initial_total_balance'
    );

    this.initialTotalBalance = response['initial_total_balance'];
  }

  async updateUserInitialTotalBalance(updatedInitialtotalBalance) {
    const body = { initial_total_balance: updatedInitialtotalBalance };

    console.log('current this.initialTotalBalance', this.initialTotalBalance);

    const response = await this.requestService.put(
      'user_initial_total_balance',
      body
    );

    if (!response) {
      this.notifications.error('Request error');
      return;
    }

    if (
      this.initialTotalBalance &&
      this.financeService.financeDataList.length
    ) {
      const totalBalanceDifferenceFromTheLastValue =
        updatedInitialtotalBalance - this.initialTotalBalance;

      const startMonthForRecalculation = moment(
        this.financeService.financeDataList[0].datetime
      ).subtract(1, 'month'); //we want to apply it to all existing months. Substract 1 month in order to fool .isAfter() function inside the function

      this.financeService.recalculateTotalBalanceValues(
        startMonthForRecalculation,
        totalBalanceDifferenceFromTheLastValue
      );
    }

    this.initialTotalBalance = response['initial_total_balance'];
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
