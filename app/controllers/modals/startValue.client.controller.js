var startValueCtrl = ['$scope', '$rootScope', '$modalInstance',
  function($scope, $rootScope, $modalInstance) {

    $scope.t = $rootScope.prefs.startValue;

    $scope.ok = function () {
      $rootScope.prefs.startValue = parseInt($scope.t);
      $rootScope.save_data();
      $modalInstance.close();
    };
  
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}];
