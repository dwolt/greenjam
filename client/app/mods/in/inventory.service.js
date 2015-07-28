/**
 * Inventory.Service.js is a cookie-cutter set of methods for CRUD on Inventorys
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
    .factory('inventoryService', dataservice);
  dataservice.$inject = ['$log', '$resource'];
  function dataservice($log, $resource) {
    $log.log('in inventoryService factory');
    return $resource('/api/Inventorys/:id', {}, {
      'list': {
        method: 'GET',
        isArray: true,
        params: {id: '@_id'}
      },
      'create': {
        method: 'POST'
      },
      'read': {
        method: 'GET',
        params: {id: '@_id'},
        interceptor: {
          responseError: function (data) {
            $log.log('inventory.service.js read error caught in interceptor', data);
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
