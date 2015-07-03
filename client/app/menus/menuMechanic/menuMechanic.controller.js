/**
 * menuMechanic.Controller.js
 */

(function() {
  'use strict';
  angular.module('greenjamApp')
    .controller('MenuMechanicCtrl', function ($scope, $http) {
      $scope.menuItems = [];
      $http.get('/api/AppMUs/menuMechanic').success(function(menu) {
        $scope.menu = menu;
        $scope.menuItems = menu.menuItems;
      });
    });
}());
