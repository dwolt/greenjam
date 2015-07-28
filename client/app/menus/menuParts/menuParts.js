/**
 * in.js is the ui-router config for this state
 * @return {function}
 */
/* global angular */
(function () {
  'use strict';
  angular.module('greenjamApp')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider.state('menuParts', {
        url: '/menuParts',
        templateUrl: 'app/menus/menuParts/menuParts.html',
        controller: 'MenuPartsCtrl',
        controllerAs: 'vm'
      });
    }]);
}());
