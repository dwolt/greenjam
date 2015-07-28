/**
 * VmrsBrand.Service.js is a cookie-cutter set of methods for CRUD on VmrsBrands
 * dataservice is an internal variable used in each data service
 * @return {$resource}
 * @todo  delete has not been tested. 
 */
/* global angular */
(function() {
  'use strict';
  /**
   * @namespace greenjamApp
   */
  angular.module('greenjamApp')
    .factory('vmrsBrandService', dataservice);
  dataservice.$inject = ['$log', '$resource'];
  function dataservice($log, $resource) {
    $log.log('in vmrsBrandService factory');
    return $resource('/api/VmrsBrands/:id?idlike', {}, {
      'list': {
        method: 'GET',
        isArray: true,
        params: {idlike: '@idlike'}
      },
      'create': {
        method: 'POST'
      },
      'read': {
        method: 'GET',
        params: {id: '@_id'},
        interceptor: {
          responseError: function (data) {
            $log.log('vmrsrand.service.js read error caught in interceptor', data);
            if (data.status === 404) {
              $log.log('record not found');
            }
          }
        }
      },
      'update': {
        method: 'PUT',
        params: {id: '@_id'}
      },
      'delete': {
        method: 'DELETE',
        params: {id: '@_id'}
      }
    });
  }
}());
