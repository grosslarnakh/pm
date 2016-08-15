//'use strict';

var startDateCtrl = ['$scope', '$rootScope', '$modalInstance',
  function($scope, $rootScope, $modalInstance) {

    $scope.dt = $rootScope.prefs.startDate;

    $scope.ok = function () {
      $rootScope.prefs.startDate = $scope.dt;
      $rootScope.weeks_provider.rebuild_weeks();
      $rootScope.weeks = $rootScope.weeks_provider.weeks;
      $rootScope.save_data();
      $modalInstance.close();
    };
  
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.opened = true;
      };

      $scope.dateOptions = $rootScope.prefs.dateOptions;

}];
