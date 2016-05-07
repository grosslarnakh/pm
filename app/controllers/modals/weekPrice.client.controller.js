'use strict';

angular.module('core').controller('WeekPriceController', ['$scope', '$rootScope', '$modalInstance',
  function($scope, $rootScope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close();
    };
  
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);
