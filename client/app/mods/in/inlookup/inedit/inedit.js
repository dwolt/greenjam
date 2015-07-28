/**
 * inedit.js is the route definition for the in.inlookup.inedit state
 * it includes the usual route/state information:
 * it is a child of the in.inlookup state
 * adding /inedit to the url of this parent
 * with a related template and controller, and the usual controllerAs 'vm'
 * plus a resolve that looks up
 * inventory (e.g. 01*NAPAX*1234), part (NAPAX*1234), and brand (NAPAX) records
 */
/* global angular */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider.state('in.inlookup.inedit', {
        url: '/inedit',
        templateUrl: 'app/mods/in/inlookup/inedit/inedit.html',
        controller: 'IneditCtrl',
        controllerAs: 'vm',
        resolve: {
          inventory: ['locId', 'brandId', 'partId', 'isNew',
            'inventoryService', '$log',
            function(locId, brandId, partId, isNew, inventoryService, $log) {
              $log.log('inedit.js resolve for inventory with isNew', isNew);
              if (locId && brandId && partId && !isNew) {
                $log.log('in inedit.js inventory');
                var docId = locId + '*' + brandId + '*' + partId;
                //a 404 (not found) will result in the inventory object === undefined in the controller
                return inventoryService.read({id: docId}).$promise;
              } else {
                $log.log('in inedit.js>resolve>inventory no document id');
                return {};
              }
            }],
          part: ['brandId', 'partId', 'partService', '$log',
            function(brandId, partId, partService, $log) {
              $log.log('in inedit.js part');
              var docId = brandId + '*' + partId;
              if (brandId === '' || partId === '0' || !partId) {
                $log.log('in inedit.js no document id');
                return {};
              } else {
                return partService.read({id: docId}).$promise;
              }
            }],
          brand: ['part', 'vmrsBrandService', '$log',
            function(part, vmrsBrandService, $log) {
              $log.log('in inedit.js brand');
              var docId = part.partBrand;
              if (!docId) {
                $log.log('in inventory.js brand function, no document id');
                return {};
              } else {
                return vmrsBrandService.read({id: docId}).$promise;
              }
            }]
        }
      });
    }]);
}());
