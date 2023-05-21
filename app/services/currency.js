import Service from '@ember/service';
import currencies from 'finance-ui-ember/static-data/currencies';
import { tracked } from '@glimmer/tracking';

export default class CurrencyService extends Service {
  @tracked selectedCurrency = this.getDefaultSelectedCurrency();

  currencies = currencies;

  getDefaultSelectedCurrency() {
    return this.currencies.find((currency) => currency.code === 'EUR');
  }
}
