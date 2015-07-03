'use strict';

angular.module('greenjamApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('menuMain', {
        url: '/',
        templateUrl: 'app/menus/menuMain/menuMain.html',
        controller: 'MenuMainCtrl'
      });
  });
