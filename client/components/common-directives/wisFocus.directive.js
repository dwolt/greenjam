/**
 * custom directive cloned from
 * from http://angular-tips.com/blog/2013/08/why-does-angular-dot-js-rock/
 * place this directive as an attribute on one field in a form and
 * the user focus (the cursor) will go there when we navigate to that state
 */
(function() {
  'use strict';
  angular.module('greenjamApp')
    .directive('wisFocus', function() {
      return {
        link: function(scope, element, attrs) {
          element[0].focus();
        }
      };
    });
})();
