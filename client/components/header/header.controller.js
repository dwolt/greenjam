/**
 * This controller backs the page header to show such information
 * as the organization, the person logged in (stubbed in here),
 * and the date/time.
 * Requires moment.js to be installed otherwise the controller
 * will not work with the jade view, as well as the date/time
 */
'use strict';
angular.module('greenjamApp')
  .controller('HeaderCtrl', ['$scope', function ($scope) {
    var vm = this;
    $scope.use = 'just using $scope for jshint purposes until we skip $scope';
    // to show how this would not be hard-coded in the view
    vm.orgName = 'LifeCycle';
    vm.userFirst = 'Dawn';
    vm.userLocation = 'Roeland Park, KS';
  }]);
