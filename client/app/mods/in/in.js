/**
 * in.js is the ui-router config for this state
 * @return {$stateProvider}
 */
/* global angular */
(function () {
  'use strict';
  angular.module('greenjamApp')
    .config(function ($stateProvider) {
      $stateProvider.state('in', {
        url: '/in/:locId',
        templateUrl: 'app/mods/in/in.html',
        controller: 'InCtrl',
        controllerAs: 'vm',
        params: {
          locId: {value: "", squash: "~"},
          brandId: {value: ""},
          partId: {value: ""},
          isNew: {value: false}
        },
        resolve: {
          locId: ['$stateParams', function ($stateParams) {
            return $stateParams.locId || '';
          }],
          brandId: ['$stateParams', function ($stateParams) {
            return $stateParams.brandId || '';
          }],
          partId: ['$stateParams', function ($stateParams) {
            return $stateParams.partId || '';
          }],
          isNew: ['$stateParams', '$log', function ($stateParams, $log) {
            return $stateParams.isNew;
          }],
          inventory: ['$stateParams', 'InventoryService', '$log',
            'locId', 'brandId', 'partId',
            function ($stateParams, InventoryService, $log,
                      locId, brandId, partId) {
              $log.log('in inventory');
              var docId = locId;
              var haveExactKey = false;
              if (locId) {
                if (brandId) {
                  docId += "*" + brandId;
                  if (partId) {
                    docId += "*" + partId;
                    haveExactKey = true;
                  }
                }
              } else {
                docId = '';
              }
              if (!haveExactKey) {
                $log.log('we do not have a full inventory key to lookup yet');
                return {"_id": docId};
              } else {
                return InventoryService.read({id: docId}).$promise;
              }
            }],
          part: ['$stateParams', 'PartService', '$log',
            function ($stateParams, PartService, $log) {
              $log.log('in part');
              var brandId = $stateParams.brandId;
              var partId = $stateParams.partId;
              var docId;
              if (brandId && partId) {
                docId = brandId + "*" + partId;
              } else {
                docId = '';
              }
              if (!docId) {
                //$stateParams.id = '';
                $log.log('in in.js no parts document id yet');
                return {};
              } else {
                return PartService.read({id: docId}).$promise;
              }
            }],
          brand: ['part', 'brandId', 'VmrsBrandService', '$log',
            function (part, brandId, VmrsBrandService, $log) {
              $log.log('in brand', brandId);
              var docId = brandId;
              if (!docId) {
                $log.log('in in.js brand function, no document id');
                return {};
              } else {
                return VmrsBrandService.read({id: docId}).$promise;
              }
            }],
          locations: ['LocationService', '$log',
            function (LocationService, $log) {
              $log.log('in locations');
              return LocationService.list().$promise;
            }]
        }
      });
    });
})();
