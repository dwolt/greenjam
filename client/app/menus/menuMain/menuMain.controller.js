/**
 * menuMain.Controller.js
 */
/* global angular */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .controller('MenuMainCtrl', MenuMainCtrl);
  MenuMainCtrl.$inject = ['$http'];
  function MenuMainCtrl($http) {
      var vm = this;
      vm.menuItems = [];
      $http.get('/api/AppMus/menuMain').success(function(menu) {
        vm.menuItems = menu.menuItems;
      });
  }
}());