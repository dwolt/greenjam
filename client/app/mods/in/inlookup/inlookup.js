/* global angular */
(function () {
  'use strict';
angular.module('greenjamApp')
  .config(function ($stateProvider) {
    $stateProvider.state('in.inlookup', {
      url: '/inlookup',
      parent: 'in',
      templateUrl: 'app/mods/in/inlookup/inlookup.html',
      controller: 'InlookupCtrl',
      controllerAs: 'vm',
      resolve: {
        gridData: ['InventoryService', 'locId', '$log',
          function(InventoryService, locId, $log) {
            $log.log('in gridData with locId', locId);
            return InventoryService.list().$promise;
          }]
        }
      });
  });
})();
