/**
 * app.js is the client-side configuration of our app, indicating
 * package dependencies, for example. It was scaffolded by yo with
 * our only additions to date being additional dependencies specified.
 *
 */
/* global angular */
/* global _ */
(function() {
  'use strict';
  angular.module('greenjamApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'toaster',
    'ui.router',
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.resizeColumns',
    'ui.grid.pagination',
    'ngMessages',
    'formly',
    'formlyBootstrap'
  ])
      .config(function ($stateProvider, $urlRouterProvider, $locationProvider,
                        $httpProvider, formlyConfigProvider) {
        formlyConfigProvider.setType({
          name: "static",
          template: "<p class=\"form-control-static\">{{model[options.key]}}"
        });
        formlyConfigProvider.setType({
          name: 'search',
          templateUrl: "components/templates/search.html",
          wrapper: "bootstrapHasError"
        });
        // formlyConfigProvider.setType({
        //   name: 'typeahead',
        //   template: '<input type="text" ng-model="model[options.key]" typeahead="item for item in to.options | filter:$viewValue | limitTo:8" class="form-control">',
        //   wrapper: ['bootstrapLabel', 'bootstrapHasError'],
        // });
        $urlRouterProvider
            .otherwise('/');
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
      })
    // for lodash, allow DI for use in controllers, unit tests
      .constant('_', window._)
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

      .run(function ($rootScope, $location, Auth, formlyConfig,
                     formlyValidationMessages, $http) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
          Auth.isLoggedInAsync(function(loggedIn) {
            if (next.authenticate && !loggedIn) {
              $location.path('/login');
            }
          });
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
                return _.pluck(response.data, "_id");
              });
            }
          }
        });
        formlyConfig.setWrapper({
          template: '<formly-transclude></formly-transclude><div class="my-messages" ng-messages="fc.$error" ng-if="options.formControl.$touched"><div class="some-message" ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">{{message(fc.$viewValue, fc.$modelValue, this)}}</div></div>',
          types: ['input', 'checkbox', 'select', 'textarea', 'radio', 'typeahead']
        });
        formlyValidationMessages.addStringMessage('required', 'This field is required');
        // var select = formlyConfig.getType('select');
        // console.log(select.template);
      });
}());