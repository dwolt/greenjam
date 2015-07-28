/**
 * in.Controller.js is a start at the more sophisticated search for entering
 * inventory items when receiving them.
 * View/route for Receiving Inventory separate from a PO
 * @return {function}
 */
/* global angular */
/* global _ */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .controller('InCtrl', InCtrl);
  InCtrl.$inject = ['$state', '$log', 'part', 'brand', 'locations',
      'locId', 'brandId', 'partId', 'isNew'];
  function InCtrl($state, $log, part, brand, locations, 
                locId, brandId, partId, isNew) {
    var vm = this;
    vm.docname = 'in.controller';
    vm.brandId = brandId;
    vm.formlyFields = [];
    vm.formlyOptions = {};
    vm.locId = locId;
    vm.onSubmit = onSubmit;
    vm.originalFields = [];
    vm.partId = partId;
    vm.searchText = '';
    vm.showEditForm = showEditForm;
    vm.showLookupTable = showLookupTable;

    /*
     * activate() triggers the main flow when instantiated
     * all subsequent statements are within added function declarations
     */
    activate();
    function activate() {
      $log.log(vm.docname, 'activate()');
      if (_.isEmpty(vm.formlyModel)) {
        vm.formlyModel = {};
        vm.formlyModel.locId = vm.locId;
        vm.formlyModel.brandId = vm.brandId;
        vm.formlyModel.partId = vm.partId;
      }
      vm.formlyFields = setFormlyFields(locations);
      vm.originalFields = angular.copy(vm.formlyFields);
      $log.log(vm.docname, 'exit');
    }

    /**
     * Public functions
     */
    /**
     * showLookupTable transitions the state to in.inlookup
     */
    function showLookupTable() {
      if (vm.searchText === '') {
        $state.go('in.inlookup', {
          locId: vm.formlyModel.locId,
          brandId: vm.formlyModel.brandId,
          partId: vm.formlyModel.searchText,
          isNew: false
        });
      }
    }
    /**
     * showEditForm transitions the state to in.inlookup.inedit
     * @param inputText is the text entered into the search field
     */
    function showEditForm(inputText) {
      if (inputText === '0') {
        isNew = true;
      }
      $log.log('about to go to in.inlookup.inedit');
      $state.go('in.inlookup.inedit', {
        locId: vm.formlyModel.locId,
        brandId: vm.formlyModel.brandId,
        partId: vm.formlyModel.searchText,
        isNew: isNew
      });
    }
    /**
     * onSubmit current shows the lookuptable
     * TODO show the edit form if there is a partId
     */
    function onSubmit() {
      vm.showLookupTable();
    }
    
  /*
   * Private functions
   * 
   * setFormlyFields() sets up the formly def for the form 
   */
    function setFormlyFields(locations) {
      return [
        {
          key: 'locId',
          type: 'select',
          templateOptions: {
            label: 'Location',
            placeholder: 'Select a location',
            required: true,
            valueProp: '_id',
            labelProp: 'name',
            options: locations
          }
        },
        {
          key: 'brandId',
          type: 'typeahead',
          templateOptions: {
            label: 'Brand',
            url: "/api/VmrsBrands",
            placeholder: 'The brand name from the supplier of this part'
          }
        },
        {
          key: 'searchText',
          type: 'search',
          templateOptions: {
            onClick: "vm.onSubmit()",
            placeholder: 'Part number or other search criteria'
          }
        }
      ];
    }
  }
}());