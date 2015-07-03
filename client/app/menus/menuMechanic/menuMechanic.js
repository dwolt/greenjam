'use strict';

angular.module('greenjamApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('menuMechanic', {
        url: '/menuMechanic',
        templateUrl: 'app/menus/menuMechanic/menuMechanic.html',
        controller: 'MenuMechanicCtrl'
      });
  });