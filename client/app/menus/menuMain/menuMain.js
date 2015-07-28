/**
 * in.js is the ui-router config for this state
 * @return {function}
 */
/* global angular */
(function () {
  'use strict';
  angular.module('greenjamApp')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider.state('menuMain', {
        url: '/',
        templateUrl: 'app/menus/menuMain/menuMain.html',
        controller: 'MenuMainCtrl',
        controllerAs: 'vm'
      });
  }]);
}());
