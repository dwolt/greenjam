/**
 * menuMechanic.Controller.js
 */
/* global angular */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .controller('MenuMechanicCtrl', MenuMechanicCtrl);
  MenuMechanicCtrl.$inject = ['$http'];
  function MenuMechanicCtrl($http) {
    var vm = this;
    vm.menuItems = [];
    $http.get('/api/AppMus/menuMechanic').success(function(menu) {
      vm.menuItems = menu.menuItems;
    });
  }
}());