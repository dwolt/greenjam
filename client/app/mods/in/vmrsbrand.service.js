/**
 * VmrsBrand.Service.js is a cookie-cutter set of methods for CRUD on VmrsBrands
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
    .factory('VmrsBrandService', ['$log', '$resource',
      function ($log, $resource) {
        $log.log('in VmrsBrandService factory');

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
              //THIS WAS THE PROBLEM I WORKED ON FOR HOURS -- IT DOES NOT
              //WORK TO HAVE THIS RESPONSE IN THERE, DAWN REMEMBER THIS!!
              //ONLY USE THIS RESPONSE TO LOG STUFF, THEN REMOVE IT
              // response: function (data) {
              //     $log.log('all is well in vmrsbrand.service');
              //     $log.log('response in interceptor');
              //     $log.log(data);
              //     $log.log('description is', data.data.vmrsDescription);
              // },
              responseError: function (data) {
                $log.log('VmrsBrand.service.js', 'error caught in interceptor', data);
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
          // 'findLike': {
          //   method: 'GET',
          //   isArray: true,
          //   params: {idlike: '@idlike'},
          // }
        });
      }]);
}());
