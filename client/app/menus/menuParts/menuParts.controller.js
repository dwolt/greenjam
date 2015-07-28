/**
 * menuParts.Controller.js
 */
/* global angular */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .controller('MenuPartsCtrl', MenuPartsCtrl);
  MenuPartsCtrl.$inject = ['$http'];
  function MenuPartsCtrl($http) {
    var vm = this;
    vm.menuItems = [];
    $http.get('/api/AppMus/menuParts').success(function(menu) {
      vm.menuItems = menu.menuItems;
    });
  }
}());