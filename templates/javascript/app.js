'use strict';

/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * # <%= scriptAppName %>
 *
 * Main module of the application.
 */
angular.module('<%= scriptName %>', [<%= angularModules %>])
  .config(function ($urlRouterProvider, $anchorScrollProvider, $uiViewScrollProvider){
   
    $urlRouterProvider.otherwise('/');
    $uiViewScrollProvider.useAnchorScroll();
    $anchorScrollProvider.disableAutoScrolling();
    
  });