'use strict';

const API_URL = process.env.API_URL || '/api/v1';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'finance-ui-ember',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    apiUrl: API_URL,
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'overview',
    routeIfAlreadyAuthenticated: 'overview',
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: API_URL + '/login',
    serverTokenRefreshEndpoint: API_URL + '/refresh',
    refreshAccessTokens: true,
    refreshLeeway: 300, // Amount of time in seconds to send refresh request before token expiration
    tokenPropertyName: 'access_token',
    refreshTokenPropertyName: 'refresh_token',
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
