'use strict';

angular.module('greenjamApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('menuParts', {
        url: '/menuParts',
        templateUrl: 'app/menus/menuParts/menuParts.html',
        controller: 'MenuPartsCtrl'
      });
  });