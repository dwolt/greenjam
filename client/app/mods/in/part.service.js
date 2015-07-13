/**
 * Part.Service.js is a cookie-cutter set of methods for CRUD on Parts
 * @return {$resource}
 * @todo  delete has not been tested. We have not determined good patterns
 * for async work and error handling in code using this service.
 */
/* global angular */
(function() {
  'use strict';
  /**
   * @namespace greenjamApp
   * @param {string} [someThing] [I will have to read up on this]
   */
  angular.module('greenjamApp')
    .factory('PartService', ['$log', '$resource',
      function ($log, $resource) {
        $log.log('in PartService factory');
        return $resource('/api/Parts/:id', {}, {
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
              //   response: function (data) {
              //       $log.log('all is well');
              //       $log.log('response in interceptor',data);
              //   },
              responseError: function (data) {
                $log.log('Part.service.js', 'error caught in interceptor', data);
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
