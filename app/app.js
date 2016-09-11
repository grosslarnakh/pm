var prefpath = (typeof prefpath == 'undefined') ? './' : prefpath;

requirejs.config({
    baseUrl: prefpath
});

requirejs([prefpath + 'app/vendor.min.js'], function() {
    loadDependencies();
});

var tr = {};

function loadDependencies() {
    requirejs([
        //'app/vendor.min',
        'app/controllers/root_ctrl',
        'app/controllers/notice_ctrl',
        'app/controllers/home_ctrl',
        'app/controllers/modals/add_ctrl',
        'app/controllers/modals/startDate.client.controller',
        'app/controllers/modals/startValue.client.controller',
        'app/models/weeks_provider',
        'app/models/week',
        'app/models/day',
        'app/models/payment',
        'app/ui-bootstrap-tpls-0.11.2.min',
        'app/locale/en',
        'app/locale/ru'
    ], function() {
        //require(['app/ui-bootstrap-tpls-0.11.2.min']);
        var pm = angular.module('pm', ['ngResource', 'ngAnimate', 'ui.router', 'ui.utils', 'ui.bootstrap', 'ui.bootstrap.modal', 'ui.bootstrap.tpls']);
        
        pm.factory('Day', day);
        pm.factory('Week', week);
        pm.factory('WeeksProvider', weeksProvider);
        pm.factory('Payment', payment);

        pm.controller('rootCtrl', rootCtrl);
        pm.controller('noticeCtrl', noticeCtrl);
        pm.controller('homeCtrl', homeCtrl);
        pm.controller('addCtrl', addCtrl);
        pm.controller('StartDateController', startDateCtrl);
        pm.controller('StartValueController', startValueCtrl);

        pm.directive('onScroll', function($window){
            return function(scope, element, attrs){
                angular.element($window).bind('scroll', function(){
                    if(this.pageYOffset > 200) {
                        scope.fixed_toolbar = true;
                    }
                    else {
                        scope.fixed_toolbar = false;
                    }
                });
            }
        });
        
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['pm']);
        });
    });
}

