'use strict';

angular.module('core').run(['$rootScope',
  function($rootScope) {
    $rootScope.$on('$viewContentLoaded',function(){
      //jQuery('html, body').animate({ scrollTop: 0 }, 200);
      window.scrollTo(0, 0);
    });
  }
]);
