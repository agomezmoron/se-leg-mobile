/**
 * Service common calls.
 *
 * @param {type} angular
 * @author Maria Villalba <mavillalba@emergya.com>
 */

(function () {
  define(['./../core.module'], function (moduleName) {
    'use strict';

    angular
      .module(moduleName)
      .service('CommonService', CommonService);

    /* @ngInject */
    function CommonService($log, $q, $http, $ionicLoading, $translate, $rootScope, CORE_CONFIGS, UtilsFactory) {
      var service = this;
      service.className = '[CommonService]';

      /**
       * Generic remote service call method.
       * @param {type} method [GET|POST]
       * @param {type} endpoint: endpoint url service.
       * @param {type} data: POST data JSON object
       * @param {type} errorMessage:
       * @param {type} params: GET data JSON object.
       * @returns {$q@call;defer.promise}
       */
      service.call = function (method, endpoint, data, errorMessage, params, showSpinner) {
        if (showSpinner) {
          $ionicLoading.show();
        }
        var deferred = $q.defer();
        /*
         //Check connection here
         */
        var connected = UtilsFactory.hasConnectivity();
        if (connected) {
          $http({method: method, url: CORE_CONFIGS.BACKEND_URL + endpoint,
            headers: {'Content-Type': 'application/json'}, data: data, params: params,
            timeout: CORE_CONFIGS.CONNECTION_TIMEOUT, cache: false})
            .then(function (response) {
              if (showSpinner) {
                $ionicLoading.hide();
              }
              deferred.resolve(response.data);
            })
            .catch(function (response, status) {
              if (showSpinner) {
                $ionicLoading.hide();
              }
              var customError = handleError(endpoint, response);
              deferred.reject(customError);
            });
        } else {
          //error
          deferred.reject();
        }
        return deferred.promise;
      };

      /**
       * Handle service connection errors.
       * @param {type} endpoint
       * @param {object} response
       * @returns {undefined}
       */
      function handleError(endpoint, response) {
        var errorMsg;
        if (response.status !== undefined) {
          switch (response.status) {
            case 0:
              //Connection error message.
              errorMsg = $translate.instant('error.service.timeout');
              break;
            case 401:
              errorMsg = $translate.instant('error.service.unauthorized');
              break;
            case 403:
              errorMsg = $translate.instant('error.service.unauthorized');
              kickOut('error.service.unauthorized');
              break;
            case 500:
              errorMsg = $translate.instant('error.service.generic');
              break;
            default:
              errorMsg = $translate.instant('error.service.generic');
              break;
          }

        } else if (response.code) {
          switch (response.code) {
            case 19: //NetworkError
              errorMsg = $translate.instant('error.service.networkError');
              break;
          }
        }

        $log.error(errorMsg);

        response.errorMessage = errorMsg;
        return response;
      }

      return service;
    }

  });

})();

