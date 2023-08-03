import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class AuthenticationService extends Service {
  @service('saving-plan') savingPlanService;
  @service('requests') requestService;
  @service notifications;
  @service session;

  async authenticate(username, password) {
    try {
      await this.session.authenticate('authenticator:jwt', {
        username,
        password,
      });

      this.savingPlanService.fetchAndSetSavingPlans();
      // load initial display name mapping after internal login
    } catch (e) {
      if (e.status === 401) {
        return this.notifications.error('Invalid credentials', {
          autoClear: true,
        });
      }

      this.notifications.error(`Unknown authentication error: ${e}`, {
        autoClear: true,
      });
    }
  }
}
