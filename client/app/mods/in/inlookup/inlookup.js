/* global angular */
(function () {
  'use strict';
  angular.module('greenjamApp')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider.state('in.inlookup', {
        url: '/inlookup',
        parent: 'in',
        templateUrl: 'app/mods/in/inlookup/inlookup.html',
        controller: 'InlookupCtrl',
        controllerAs: 'vm',
        resolve: {
          gridData: ['inventoryService',
            function(inventoryService) {
              //no query criteria yet, see regex attempts
              return inventoryService.list({
                }).$promise;
            }]
          }
        });
    }]);
})();
