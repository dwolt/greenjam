/**
 * Location.Service.js is a cookie-cutter set of methods for CRUD on Locations
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
    .factory('locationService', dataservice);
  dataservice.$inject = ['$log', '$resource'];
  function dataservice($log, $resource) {
    $log.log('in locationService factory');
    return $resource('/api/Locations/:id', {}, {
      'list': {
        method: 'GET',
        isArray: true
      },
      'create': {
        method: 'POST'
      },
      'read': {
        method: 'GET',
        params: {id: '@_id'},
        interceptor: {
          responseError: function (data) {
            $log.log('location.service.js read error caught in interceptor', data);
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
