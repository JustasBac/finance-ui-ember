import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EconomyService extends Service {
  @tracked monthIncomeListByMonth = [];
}
