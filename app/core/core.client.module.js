'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

angular.module('core').directive('selectOnFocus', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.on('focus', function(){
                this.select();
            })
        }
    };
});

angular.module('core').directive('onScroll', function($window){
    return function(scope, element, attrs){
        angular.element($window).bind('scroll', function(){
            scope.fixed_toolbar = false;
            if(this.pageYOffset > 200) {
                scope.fixed_toolbar = true;
            }
        });
    }
});