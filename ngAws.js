'use strict';

angular.module('ngAws', [])
  .provider('$aws', function () {

    // Private variables
    var config = {
      RoleArn: null,
      WebIdentityToken: null,
      RoleSessionName: 'web-identity-federation'
    };
    var aws = null;

    // Private constructor
    function AwsService() {
      aws = AWS;

      this.setToken = function(token, providerId) {
        if (providerId) {
          config.ProviderId = providerId;
        }
        aws.config.credentials = new aws.WebIdentityCredentials(config);
      };
      this.getAWS = function () {
        return aws;
      };
    }

    // Public API for configuration
    this.setArn = function (a) {
      config.RoleArn = a;
    };

    // Method for instantiating
    this.$get = function () {
      return new AwsService();
    };
  });
