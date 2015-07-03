/**
 * Location.Service.js is a cookie-cutter set of methods for CRUD on Locations
 * @return {$resource}
 * @todo  delete has not been tested. We have not determined good patterns
 * for async work and error handling in code using this service.
 */
(function() {
  'use strict';
  /**
   * @namespace greenjamApp
   * @param {string} [someThing] [I will have to read up on this]
   */
  angular.module('greenjamApp')
    .factory('LocationService', ['$log', '$resource',
      function ($log, $resource) {
        $log.log('in LocationService factory');
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
                $log.log('location.service.js', 'error caught in interceptor', data);
                data = {};
                data._id = '0';
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
      }]);
}());
