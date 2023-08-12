import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class OverviewController extends Controller {
  @tracked activeTab = 'totalBalance';
}
