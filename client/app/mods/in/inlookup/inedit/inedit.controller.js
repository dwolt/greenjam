/**
 * in.controller
 * @return {function} InCtrl, typically controllerAs vm
 *
 * TODO CONCURRENCY handling.
 * inventory, part, brand are records/documents from the database
 * the are read from in the resolve for this state, see inedit.js
 */
/* global angular */
/* global _ */
/* global JSON */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .controller('IneditCtrl', IneditCtrl);
  IneditCtrl.$inject = ['$state', '$log',
        'inventory', 'part', 'brand', 'toaster', 'partService', 'inventoryService',
        'locId', 'brandId', 'partId', 'isNew'];
  function IneditCtrl($state, $log, inventory, part, brand, toaster, 
                      partService, inventoryService, locId, brandId, 
                      partId, isNew) {
    var vm = this;
    vm.docname = 'inedit.controller';
    /**
     * brand is the record from VmrsBrands, where brandId is the _id
     * it is resolved in the router in inedit.js
     * and is used to show the description of the supplier/brand if
     * the user comes into this controller with an existing brandId
     */
    vm.brand = brand || {};
    vm.formlyFields = [];
    vm.formlyModel = {};
    vm.formlyOptions = {};
    vm.locId = locId;
    /**
     * inventory is a single document/record from Inventorys
     * resolved in the router inedit.js
     * this will become the formlyModel if it exists
     * @type {inventory|*}
     */
    vm.inventory = inventory || {};
    /**
     * we will need to know whether we are creating a new record or working
     * with an existing record so we Create or Update, and for focus
     */
    vm.isNewInventoryId = isNew || _.isEmpty(inventory) || !inventory._id;
    vm.isNewPartId = _.isEmpty(part) || !part._id;
    vm.onSubmit = onSubmit;
    vm.originalFields = [];
    /**
     * part is a single document/record from Parts, resolved in inedit.js
     * this will back some of the formlyFields or will be created
     */
    vm.part = part || {};

    /*
     * activate() pull the trigger on the main flow when instantiated
     */
    activate();

    function activate() {
      //$log.log(vm.docname, 'activate()');
      if (!vm.brand.vmrsDescription) {
        vm.brand.vmrsDescription = '';
      }
      if (!vm.isNewInventoryId) {
        inventory.isInventory = true;
        inventory.isActive = true;
        vm.formlyModel = inventory;
      }
      vm.formlyModel.brandId = brandId;
      vm.formlyModel.partId = partId;
      if (vm.isNewInventory) {
        vm.inventory = {};
        vm.formlyModel._id = vm.locId +
          '*' + vm.formlyModel.brandId +
          '*' + vm.formlyModel.partId;
      }
      if (vm.isNewPartId) {
        vm.part = {};
        vm.part._id = vm.formlyModel.brandId + '*' + vm.formlyModel.partId;
      }
      vm.formlyFields = setformlyFields();
      vm.originalFields = angular.copy(vm.formlyFields);
      //$log.log(vm.docname, 'leaving this function with model', vm.formlyModel);
    }
    /**
     * PUBLIC FUNCTIONS
     *
     */
    function onSubmit() {
      //$log.log('in onSubmit()');
      addOrUpdatePart();
    }
    /*
     * PRIVATE FUNCTIONS
     */
    /**
     * addOrUpdateInventory()
     * When the user clicks submit, we will add or update an inventory item
     */
    function addOrUpdateInventory() {
      vm.formlyModel._id = vm.locId + '*' +
        vm.formlyModel.brandId + '*' +
        vm.formlyModel.partId;
      vm.inventory._id = vm.formlyModel._id;
      vm.inventory.availQty = vm.formlyModel.availQty;
      vm.inventory.isInventory = vm.formlyModel.isInventory;
      vm.inventory.isActive = vm.formlyModel.isActive;
      //$log.log('vm.inventory before creating it is', vm.inventory);
      if (vm.isNewInventoryId) {
        inventoryService.create(vm.inventory,
          function(success) {
            var msg = 'Your new inventory document has been filed with an ID of ' + vm.inventory._id;
            vm.isNewInventoryId = false;
            vm.inventory = {};
            vm.formlyModel = {};
            toaster.pop({type: 'success', title: 'Success',
              body: msg, closeButton: true, showDuration: '10000'});
          $state.go('in', {
            locId: vm.locId,
            brandId: '',
            partId: '',
            isNew: false
          });
          },
          function(failure) {
            $log.error('failure writing new record', failure);
          });
      } else {
        updateInventory(vm.inventory);
        //if success... if failure...
      }
    }

    /**
     * addOrUpdatePart either adds a new document to the Parts
     * collection or updates an existing document/record if it 
     * already exists
     * @returns {boolean}
     */
    function addOrUpdatePart() {
      vm.part._id = vm.formlyModel.brandId + "*" + vm.formlyModel.partId;
      if (vm.isNewPartId) {
        partService.create(vm.part,
          function(success) {
            vm.isNewPartId = false;
            vm.part = {};
            addOrUpdateInventory();
          },
          function(failure) {
            $log.error('failure writing new record', failure);
          });
      } else {
          //test out the async error handling here after figuring out more precisely
          //what the desired behavior is
          updatePart(vm.part);
          //if all goes well with the update then
          addOrUpdateInventory();
      }
    }
    /**
     * updatePart()
     * update a part once you figure out that it is not new
     */
    function updatePart(part) {
      //proper error handling needed here
      partService.update(part, 
        function(success) {
          $log.log(vm.docname, 'part document is updated');
        },
        function(failure) {
        $log.error('failure writing new record', failure);
        }
      );
    }
    /**
     * updateInventory()
     * update an inventory record if it is not new
     */
    function updateInventory(inventory) {
      inventoryService.update(inventory,
      function(success) {
        var msg = 'Your inventory document has been filed with an ID of ' + inventory._id;
        vm.inventory = {};
        vm.formlyModel = {};
        toaster.pop({type: 'success', title: 'Success',
          body: msg, closeButton: true, showDuration: '10000' });
        $state.go('in', {
          locId: vm.locId,
          brandId: '',
          partId: '',
          isNew: false
        });
      },
      function(failure) {
        $log.error('failure writing new record', failure);
      });
    }
    /*
     * setformlyFields() sets up the formly def for the form
     */
    function setformlyFields() {
      return [
        {
          key: '_id',
          type: 'input',
          hide: true,
          templateOptions: {
            label: 'Id should not show on screen'
          }
        },
        {
          key: 'brandId',
          type: 'input',
          templateOptions: {
            required: vm.isNewPartId,
            label: 'Brand, the first part of the Part number',
            focus: vm.isNewPartId,
            placeholder: 'Enter the brand',
            disabled: !vm.isNewPartId
          }
        },
        {
          key: 'vmrsDescription',
          type: 'static',
          model: vm.brand
        },
        {
          key: 'partId',
          type: 'input',
          templateOptions: {
            required: vm.isNewPartId,
            label: 'Second part of Part number',
            placeholder: 'Enter the part number',
            disabled: !vm.isNewPartId
          }
        },
        {
          key: 'vmrsNbr',
          type: 'input',
          model: vm.part,
          templateOptions: {
            required: true,
            label: 'VMRS Number',
            focus: false,
            debounce: 150,
            placeholder: 'Enter VMRS number'
          },
          validators: {
            // simple illustration of client-side validation
            // if the user enters 'hi' as the value, that will fail validation
            valtest: {
              expression: function(viewValue, modelValue) {
                $log.log(modelValue);
                return viewValue !== 'hi';
              },
              message: '$viewValue + " is simply not a good value"'
            }
          }
        },
        {
          key: 'partType',
          type: 'input',
          model: vm.part,
          templateOptions: {
            required: true,
            label: 'Part type',
            focus: false,
            debounce: 150,
            placeholder: 'Enter part type'
          }
        },
        {
          key: 'isTemp',
          type: 'checkbox',
          model: vm.part,
          templateOptions: {
            label: 'Is this part temporary?'
          }
        },
        {
          key: 'isInventory',
          type: 'checkbox',
          templateOptions: {
            label: 'Is this an inventory part?'
          }
        },
        {
          key: 'isActive',
          type: 'checkbox',
          templateOptions: {
            label: 'Is this active?'
          }
        },
        {
          key: 'availQty',
          type: 'input',
          templateOptions: {
            label: 'Available quantity'
          }
        }
      ];
    }
  }
}());
