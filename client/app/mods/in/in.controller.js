/**
 * in.Controller.js is a start at the more sophisticated search for entering
 * inventory items when receiving them.
 * View for Receiving Inventory separate from a PO
 * @return {Controller}
 * @todo  Search needs to be converted to formly and implemented in a big way
 * next up is putting a select of the location at the top
 * and defaulting the location to the url location not yet
 * indicated in the url params
 */
/* global angular */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .controller('InCtrl', ['$state', '$stateParams', '$log',
      'inventory', 'part', 'brand', 'VmrsBrandService', 'locations',
      'locId', 'brandId', 'partId',
      function ($state, $stateParams, $log, inventory, part, brand,
                VmrsBrandService, locations, locId, brandId, partId) {
        var vm = this;
        vm.docname = 'in.controller';
        $log.log(vm.docname, 'entering this function');
        /**
         * What the user enters into the search field
         */
        vm.searchText = '';
        /**
         * parts of the multi-part key to Inventorys locId * brandId * partId
         */
        vm.locId = locId;
        vm.brandId = brandId;
        vm.partId = partId;
        /**
         * options for the grid
         */
        vm.options = {};
        /**
         * fields for formly
         */
        vm.formFields = [];
        /**
         * copy of the original formly formFields for the reset option
         */
        vm.originalFields = [];
        /*
         * activate()
         * pull the trigger on the main flow
         */
        activate();
        /*
         This is activated when the controller is instantiated
         */
        function activate() {
          $log.log('activating main flow');
          if (_.isEmpty(vm.searchCriteria)) {
            vm.searchCriteria = {};
            vm.searchCriteria.locId = vm.locId;
            vm.searchCriteria.brandId = vm.brandId;
            vm.searchCriteria.partId = vm.partId;
          }
          vm.formFields = setFormFields(VmrsBrandService, locations);
          vm.originalFields = angular.copy(vm.formFields);
          return;
        }
        /**
         * Switch from search (in) to the lookup table state (in.inlookup)
         * This should perhaps be switched to function showLookupTable()
         * if the view no longer needs it
         */
        vm.showLookupTable = function() {
          if (vm.searchText == '') {
            //$state.transitionTo("sprocket", { id: "123" });
            $state.go('in.inlookup', {
              //$state.transitionTo('inlookup', {
              locId: vm.locId,
              brand: vm.brandId,
              part: ''
            });
          }
        };
        vm.showEditForm = function(inputText) {
          if (inputText) {
            vm.partId = inputText;
          }
          $state.go('in.inlookup.inedit', {
            locId: vm.locId,
            brandId: vm.brandId,
            partId: vm.partId
          });
        };
        vm.search = function() {
          vm.showLookupTable();
        };
        $log.log(vm.docname, 'leaving this function');
      }]);
  /*
   * setFormFields() sets up the formly def for the form
   */
  function setFormFields(VmrsBrandService, locations) {
    var formFields = [
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
          onClick: "vm.search()",
          placeholder: 'Part number or other search criteria'
        }
      }
    ];
    return formFields;
  }
}());
