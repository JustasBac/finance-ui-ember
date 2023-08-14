import JWTAuthenticator from 'ember-simple-auth-token/authenticators/jwt';

export default class JWTInternalAuthenticator extends JWTAuthenticator {
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
