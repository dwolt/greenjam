'use strict';

angular.module('greenjamApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inedit', {
        url: '/inedit',
        templateUrl: 'app/mods/in/inlookup/inedit/inedit.html',
        controller: 'IneditCtrl'
      });
  });