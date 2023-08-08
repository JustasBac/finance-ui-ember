import Service from '@ember/service';
import currencies from 'finance-ui-ember/static-data/currencies';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CurrencyService extends Service {
  @service('requests') requestService;
  @service notifications;

  @tracked selectedCurrency = {};

  currencies = this.getCurrencies();

  getCurrencies() {
    currencies.forEach((currencyInfo) => {
      const { code, name, symbol } = currencyInfo;
      currencyInfo.searchableText = `${code} ${name} ${symbol}`; //in dropdown we just show currency code and a symbol, for example: EUR (€). When user hits in a search currency name "Euro" we still want to return by name too
    });

    return currencies;
  }

  async fetchAndSetCurrencyData() {
    const response = await this.requestService.fetch('app_currency');

    const userCurrencyCode = response['app_currency_code'];

    this.selectedCurrency = this.currencies.find(
      (currency) => currency.code === userCurrencyCode
    );
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
}
