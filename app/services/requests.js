import Service from '@ember/service';
import ENV from 'finance-ui-ember/config/environment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class RequestsService extends Service {
  @service session;

  @computed(
    'session.data.authenticated.access_token',
    'session.isAuthenticated'
  )
  get token() {
    if (this.session.isAuthenticated) {
      return `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return null;
  }

  async fetch(endPoint) {
    try {
      const response = await fetch(`${ENV.apiUrl}/${endPoint}`, {
        method: 'GET',
        headers: {
          // accept: 'application/json',
          Authorization: this.token,
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  async post(endPoint, bodyData) {
    try {
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.token,
        },
        body: JSON.stringify(bodyData),
      };

      const response = await fetch(`${ENV.apiUrl}/${endPoint}`, options);

      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  async delete(endPoint, id) {
    try {
      const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.token,
        },
      };

      const response = await fetch(`${ENV.apiUrl}/${endPoint}/${id}`, options);

      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }

  async put(endPoint, bodyData, id) {
    try {
      const options = {
        method: 'PUT',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.token,
        },
        body: JSON.stringify(bodyData),
      };

      const response = await fetch(`${ENV.apiUrl}/${endPoint}/${id}`, options);

      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }
}
