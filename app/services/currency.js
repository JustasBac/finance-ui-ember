import Service from '@ember/service';
import currencies from 'finance-ui-ember/static-data/currencies';
import { tracked } from '@glimmer/tracking';

export default class CurrencyService extends Service {
  @tracked selectedCurrency = this.getDefaultSelectedCurrency();

  currencies = this.getCurrencies();

  getCurrencies() {
    currencies.forEach((currencyInfo) => {
      const { code, name, symbol } = currencyInfo;
      currencyInfo.searchableText = `${code} ${name} ${symbol}`; //in dropdown we just show currency code and a symbol, for example: EUR (€). When user hits in a search currency name "Euro" we still want to return by name too
    });

    return currencies;
  }

  getDefaultSelectedCurrency() {
    return this.currencies.find((currency) => currency.code === 'EUR');
  }
}
