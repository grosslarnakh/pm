'use strict';

angular.module('core').controller('NoticeCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout){
    $rootScope.notice = null;

    $rootScope.addNotice = function(notice){
        $rootScope.notice = notice;
        clearNotice();
    };

    $rootScope.noticeIsEmpty = function(){
        return $rootScope.notice == null;
    };

    function clearNotice(){
        $timeout(
            function(){
                $rootScope.notice = null;
            }, 3000
        );
    }
}]);
