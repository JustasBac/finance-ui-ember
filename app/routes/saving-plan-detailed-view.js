import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SavingPlanDetailedViewRoute extends Route {
  @service('saving-plan') savingPlanService;
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model(params) {
    const savingPlanIdFromParams = params['saving_plan_id'];

    return this.savingPlanService.savingPlans.find(
      (plan) => plan.id === +savingPlanIdFromParams
    );
  }
}
