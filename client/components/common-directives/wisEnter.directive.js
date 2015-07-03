/**
 * custom directive from from http://jsfiddle.net/lsconyer/bktpzgre/1/
 * when the user clicks enter on a field with this directive added
 * as an attribute, whatever function is indicated as the handler will fire
 */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .directive('wisEnter', function() {
      return function(scope, element, attrs) {
        element.bind('keydown keypress', function(event) {
          if(event.which === 13) {
            scope.$apply(function() {
              scope.$eval(attrs.wisEnter);
            });
            event.preventDefault();
          }
        });
      };
    });
})();
