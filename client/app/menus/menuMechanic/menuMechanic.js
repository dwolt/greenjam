/**
 * in.js is the ui-router config for this state
 * @return {function}
 */
/* global angular */
(function () {
  'use strict';
  angular.module('greenjamApp')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider.state('menuMechanic', {
        url: '/menuMechanic',
        templateUrl: 'app/menus/menuMechanic/menuMechanic.html',
        controller: 'MenuMechanicCtrl',
        controllerAs: 'vm'
      });
    }]);
}());
