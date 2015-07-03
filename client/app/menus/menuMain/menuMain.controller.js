/**
 * menuMain.Controller.js
 */

(function() {
  'use strict';
  angular.module('greenjamApp')
    .controller('MenuMainCtrl', function ($scope, $http) {
      $scope.menuItems = [];
      $http.get('/api/AppMus/menuMain').success(function(menu) {
        $scope.menu = menu;
        $scope.menuItems = menu.menuItems;
      });
    });
}());
