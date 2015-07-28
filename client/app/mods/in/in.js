/**
 * in.js is the ui-router config for this state
 * @return {function}
 */
/* global angular */
(function () {
  'use strict';
  angular.module('greenjamApp')
    .config(['$stateProvider', function ($stateProvider) {
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
          isNew: ['$stateParams', function ($stateParams) {
            return $stateParams.isNew;
          }],
          part: ['$stateParams', 'partService', '$log',
            function ($stateParams, partService, $log) {
              var brandId = $stateParams.brandId;
              var partId = $stateParams.partId;
              var docId;
              if (brandId && partId) {
                docId = brandId + "*" + partId;
              } else {
                $log.log('in in.js no parts document id yet');
                return {};
              }
              return partService.read({id: docId}).$promise;
            }],
          brand: ['brandId', 'vmrsBrandService',
            function (brandId, vmrsBrandService) {
              var docId = brandId;
              if (!docId) {
                return {};
              } 
              return vmrsBrandService.read({id: docId}).$promise;
            }],
          locations: ['locationService',
            function (locationService) {
              return locationService.list().$promise;
            }]
        }
      });
    }]);
})();
