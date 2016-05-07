angular
.module('exspsApp', ['ui.bootstrap'])
.controller('RecordsListCtrl', function ($scope) {

  $scope.prefs = {
    weeklyPrice: '0',
    startValue: '0'
  };

  $scope.ruLabels = {
    week:'Неделя',
    date:'Дата',
    incomes:'Доходы',
    flows:'Расходы',
    weekPrice:'Цена недели',
    total:'Итого',
    startValue:'Начальная сумма'
  };


  $scope.items = [
    {

     'id':1,
     'type':'flow',
     'status':1,
     'name': 'Мама',
     'value': '-10000',
     'period_in_days': 'раз в месяц',
     'payment_day':'12',
     'isNew':false 

   },{

     'id':2,
     'status':1,
     'type':'flow',
     'name': 'Аренда',
     'value': '-20000',
     'period_in_days': 'раз в месяц',
     'payment_day':'12',
     'isNew':false 

   },{
     
     'id':3,
     'status':2,
     'type':'income',
     'name': 'Зарплата',
     'value': '50000',
     'period_in_days': 'раз в месяц',
     'payment_day':'10',
     'isNew':false 

   }
  ];

$scope.showpopup = function(i) {
  alert ('a');
};

})


.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  // alert ($scope.nameqq);
  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          //return $scope.items;
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
      item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})
;



