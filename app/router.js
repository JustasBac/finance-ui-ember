import EmberRouter from '@ember/routing/router';
import config from 'finance-ui-ember/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' });
  this.route('saving-plan-detailed-view', {
    path: 'saving-plan/:saving_plan_id',
  });
  this.route('finance-overview');
  this.route('currency-selection');
  this.route('login');
  this.route('register');
});
