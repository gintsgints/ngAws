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
    var sts = null;

    // Private constructor
    function AwsService($q) {
      aws = AWS;
      sts = new AWS.STS();
      var d = $q.defer();

      this.setToken = function(token, providerId) {

        if (providerId) {
          config.ProviderId = providerId;
        }

        var params = {
          RoleArn: config.RoleArn,
          RoleSessionName: config.RoleSessionName,
          WebIdentityToken: token,
          ProviderId: providerId,
        };

        sts.assumeRoleWithWebIdentity(params, function(err, data) {
          if (err) {
            // console.log(err, err.stack);
            d.reject(err);
          } else {
            // console.log(data.Credentials);
            aws.config.accessKeyId = data.Credentials.AccessKeyId;
            aws.config.secretAccessKey = data.Credentials.SecretAccessKey;
            aws.config.sessionToken = data.Credentials.SessionToken;
            d.resolve(data);
          }
        });

        return d.promise;
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
    this.$get = ['$q', function ($q) {
      return new AwsService($q);
    }];
  });
