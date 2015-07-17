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
        gridData: ['InventoryService', 'locId', 'brandId', 'partId', '$log',
          function(InventoryService, locId, brandId, partId, $log) {
            $log.log('in gridData with locId', locId);
            var regex = locId;
            if (brandId) { 
              regex += '*' + brandId;
              if (partId) {
                regex += '*' + partId;
              }
            }
            if (!partId) {
              regex = '^' + regex;
            }
            //the following does not work as anticiapted
            regex = new RegExp(regex);
            return InventoryService.list({
              //"_id" : {$regex : '^01'}  //does not work
              //"_id" : {$regex : regex}
              //'_id' : {$regex : regex} //nope
              //'_id' : {'$regex' : regex} //nope
              //'id' : {$regex : regex} //nope
              }).$promise;
          }]
        }
      });
  });
})();
