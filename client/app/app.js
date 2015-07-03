'use strict';
/* global angular */
/* global _ */
angular.module('greenjamApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngMessages',
  'formly',
  'formlyBootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider,
                    $httpProvider, formlyConfigProvider) {
    //formlyConfigProvider.setType({
    //  name: "static",
    //  template: "<p class=\"form-control-static\">{{model[options.key]}}"
    //});
    $urlRouterProvider
      .otherwise('/formlytest');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, formlyConfig, $http) {
    console.log('stateChangeStart');
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
    formlyConfig.setType({
      name: 'static',
      template: '<p class="form-control-static">{{model[options.key]}}'
    });
    formlyConfig.setType({
      name: 'search',
      templateUrl: "components/templates/search.html",
      wrapper: "bootstrapHasError"
    });
    formlyConfig.setType({
      name: 'typeahead',
      templateUrl: "components/templates/typeahead.html",
      wrapper: ["bootstrapLabel", "bootstrapHasError"],
      link: function(scope, element) {
        var lastSearchValue;
        scope.format = scope.to.format? scope.to.format : _.identity;
        scope.load = remoteSearch;
        function remoteSearch(searchValue) {
          lastSearchValue = searchValue;
          return $http.get(scope.to.url, {
            params: {
              idlike: searchValue
            }
          }).then(function (response) {
            var arr = _.pluck(response.data, "_id");
            return arr;
          });
        }
      }
    });
  });
