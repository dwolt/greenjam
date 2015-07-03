'use strict';

angular.module('greenjamApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('inlookup', {
        url: '/inlookup',
        templateUrl: 'app/mods/in/inlookup/inlookup.html',
        controller: 'InlookupCtrl'
      });
  });