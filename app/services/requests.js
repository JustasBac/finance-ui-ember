import Service from '@ember/service';
import ENV from 'finance-ui-ember/config/environment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class RequestsService extends Service {
  @service session;

  @computed('session.data.authenticated.access_token')
  get token() {
    if (this.session.isAuthenticated) {
      return `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return null;
  }

  async fetch(endPoint) {
    console.log(`${ENV.apiUrl}`);
    try {
      const response = await fetch(`${ENV.apiUrl}/${endPoint}`, {
        method: 'GET',
        headers: {
          // accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDg3OTcyMywianRpIjoiOTRjNTNmYmUtMzljMC00NmZmLWEwZjAtNDMxMzRmMDhhM2U0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjkwODc5NzIzLCJleHAiOjE2OTA4ODA2MjN9.u84taferecWicJeTxFEP0liEx1ofYK7GNTKBT9wCDfU`,
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }
}
