var startValueCtrl = ['$scope', '$rootScope', '$modalInstance',
  function($scope, $rootScope, $modalInstance) {

    $scope.t = $rootScope.prefs.startValue;

    $scope.ok = function () {
      if($scope.t == '') {
        $scope.t = 0;
      }
      $rootScope.prefs.startValue = parseInt($scope.t, 10);
      $rootScope.save_data();
      $modalInstance.close();
    };
  
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}];
