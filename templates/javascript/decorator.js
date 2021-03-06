'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.decorator:<%= classedName %>
 * @description
 * # <%= classedName %>
 * Decorator of the <%= scriptAppName %>
 */
angular.module('<%= scriptName %>')
  .config(function ($provide) {
    $provide.decorator('<%= cameledName %>', function ($delegate) {
      // decorate the $delegate
      return $delegate;
    });
  });