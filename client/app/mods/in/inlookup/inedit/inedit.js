/* global angular */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .config(function ($stateProvider) {
      $stateProvider.state('in.inlookup.inedit', {
        url: '/inedit',
        templateUrl: 'app/mods/in/inlookup/inedit/inedit.html',
        controller: 'IneditCtrl',
        controllerAs: 'vm',
        resolve: {
          inventory: ['locId', 'brandId', 'partId', 'isNew',
            'InventoryService', '$log',
            function(locId, brandId, partId, isNew, InventoryService, $log) {
              $log.log('inedit.js resolve for inventory with isNew', isNew);
              if (locId && brandId && partId && !isNew) {
                $log.log('in inedit.js inventory');
                var docId = locId + '*' + brandId + '*' + partId;
                return InventoryService.read({id: docId}).$promise;
              } else {
                $log.log('in inedit.js>resolve>inventory no document id');
                return {};
              }
            }],
          part: ['brandId', 'partId', 'PartService', '$log',
            function(brandId, partId, PartService, $log) {
              $log.log('in inedit.js part');
              var docId = brandId + '*' + partId;
              if (brandId === '' || partId === '0' || !partId) {
                $log.log('in inedit.js no document id');
                return {};
              } else {
                return PartService.read({id: docId}).$promise;
              }
            }],
          brand: ['part', 'VmrsBrandService', '$log',
            function(part, VmrsBrandService, $log) {
              $log.log('in inedit.js brand');
              var docId = part.partBrand;
              if (!docId) {
                $log.log('in inventory.js brand function, no document id');
                return {};
              } else {
                return VmrsBrandService.read({id: docId}).$promise;
              }
            }]
        }
      });
    });
}());
