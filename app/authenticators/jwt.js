import JWTAuthenticator from 'ember-simple-auth-token/authenticators/jwt';
// import { inject as service } from '@ember/service';

export default class JWTInternalAuthenticator extends JWTAuthenticator {
  // @service('requests') requestService;
  // @service router;

  // authenticate(credentials, headers) {
  //   console.log('AUTHENTICATE');
  //   return this.makeRequest(this.serverTokenEndpoint, credentials, {
  //     ...this.headers,
  //     ...headers,
  //   }).then(async (response) => {
  //     const sessionData = this.handleAuthResponse(response.json);

  //     console.log('sessionData', sessionData);
  //     await this.requestService.loadAppData(sessionData.access_token);

  //     this.router.transitionTo('home');
  //     return sessionData;
  //   });
  // }

  refreshAccessToken(refreshToken) {
    return this.makeRequest(
      this.serverTokenRefreshEndpoint,
      {},
      {
        ...this.headers,
        Authorization: `Bearer ${refreshToken}`,
      }
    )
      .then((response) => {
        const sessionData = this.handleAuthResponse(response.json);
        this.trigger('sessionDataUpdated', sessionData);
        return sessionData;
      })
      .catch((error) => {
        this.handleTokenRefreshFail(error.status);
        return Promise.reject(error);
      });
  }
}
