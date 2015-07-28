/**
 * inlookup.controller backs a jade view with a lookup table
 * @return {function} InlookupCtrl, typically controllerAs vm
 *
 * The "vm" variable here is for "this", naming view-model instance variables
 * While we have a standard of not passing in $scope, we have verified with
 * ui-grid developers that we must pass it in
 */
/* global angular */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .controller('InlookupCtrl', InlookupCtrl);
  InlookupCtrl.$inject = ['$scope', '$state', '$log', 
      'gridData', 'locId', 'isNew'];
  function InlookupCtrl($scope, $state, $log, gridData,
                locId, isNew) {
    var vm = this;
    vm.docname = 'inlookup.controller';
    /**
     * The div in inlookup.jade only shows if we are in the in.inlookup state
     */
    vm.show = $state.is('in.inlookup');
    /**
     * The gridData is passed in from the resolve associated with this state
     * TODO pass in only the first n rows and then subsequently 
     * use an infinite scroll to retrieve other rows async
     */
    vm.gridData = gridData;
    vm.gridOptions = {};
    vm.showEditForm = showEditForm;
    
    /*
     * activate() trigger the main flow when instantiated
     */
    activate();
    function activate() {
      $log.log(vm.docname, 'activate()');
      vm.gridOptions = {
        data: 'vm.gridData',
        enableCellSelection: false,
        enableRowSelection: true,
        enableCellEditOnFocus: false,
        showSelectionCheckbox: true,
        multiSelect: false,
        enableScrollbars: false,
        rowsPerPage: 8,
        minRowsToShow: 8,
        paginationPageSizes: [8, 20, 30],
        paginationPageSize: 8,
        selectedItems: vm.selectedRows,
        columnDefs: [
          {field: '_id', displayName: 'Id'},
          {field: 'inventoryLocation', displayName: 'Loc'},
          {field: 'inventoryBrand', displayName: 'Brand'},
          {field: 'inventoryPartNumber', displayName: 'Part'},
          {field: 'availQty', displayName: 'Avail Qty'},
          {field: 'lastCost', displayName: 'Last Cost'}
        ]
      };
      vm.gridOptions.onRegisterApi = function(gridApi) {
        $scope.gridApi = gridApi;   // keep around, maybe this should be vm.gridApi?
        gridApi.selection.on.rowSelectionChanged($scope, function(row) {
          $log.log('about to showEditForm with locId=', row.entity.inventoryLocation);
          vm.showEditForm(row.entity.inventoryLocation, row.entity.inventoryBrand,
            row.entity.inventoryPartNumber);
        });
      };
      $log.log(vm.docname, 'leaving this function');
    }

    /**
     * Public functions
     * 
     * showEditForm When the user clicks a row in the grid, then we go to the state
     * in.inlookup.inedit with the params from in.js resolve
     * 
     * @param locId
     * @param brandId
     * @param partId
     */
    function showEditForm(locId, brandId, partId) {
      $state.go('in.inlookup.inedit', {
        "locId": locId, 
        "brandId": brandId,
        "partId": partId,
        "isNew": isNew
      });
    }
  }
}());
