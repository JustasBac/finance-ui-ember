import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SavingPlanDetailedViewRoute extends Route {
  @service('saving-plan') savingPlanService;
  @service session;
  @service router;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  model(params) {
    const savingPlanIdFromParams = params['saving_plan_id'];

    const savingPlan = this.savingPlanService.savingPlans.find(
      (plan) => plan.id === +savingPlanIdFromParams
    );

    if (!savingPlan) {
      this.router.transitionTo('home');
    }

    return savingPlan;
  }
}
