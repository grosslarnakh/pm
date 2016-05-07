angular
.module('exspsApp', ['ui.bootstrap', "xeditable"])
.controller('RecordsListCtrl', function ($scope) {

  $scope.prefs = {
    weeklyPrice: '4000',
    startValue: '-30000'
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
  $scope.nameqq = "Bob";
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

// xeditable

.run(function(editableOptions) {
  editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
})

.controller('EditableTableCtrl', function ($scope, $filter, $http, $q) {
   //alert($scope.items[1].name);

  /*$scope.items = [
    {id: 1, name: 'awesome item1', status: 2},
    {id: 2, name: 'awesome item2', status: undefined},
    {id: 3, name: 'awesome item3', status: 2}
  ];*/ 

  //alert ($scope.items.length);

  $scope.statuses = [
    {value: 1, text: 'Расход'},
    {value: 2, text: 'Доход'},
  ]; 

  $scope.periods = [
    {value: 'monthly', text: 'Ежемесячно'},
    {value: 'weekly', text: 'Еженедельно'},
  ]; 


  $scope.groups = [];
  $scope.loadGroups = function() {
    return $scope.groups.length ? null : $http.get('/groups').success(function(data) {
      $scope.groups = data;
    });
  };

  $scope.showGroup = function(item) {
    if(item.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: item.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return item.groupName || 'Not set';
    }
  };

  $scope.showStatus = function(item) {
    var selected = [];
    if(item.status) {
      selected = $filter('filter')($scope.statuses, {value: item.status});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  $scope.checkName = function(data, id) {
//    if (id === 2 && data !== 'awesome') {
//      return "itemname 2 should be `awesome`";
//    }
  };

  // filter items to show
  $scope.filterRecord = function(item) {
    return item.isDeleted !== true;
  };

  // mark item as deleted
  $scope.deleteRecord = function(id) {
    var filtered = $filter('filter')($scope.items, {id: id});
    if (filtered.length) {
      filtered[0].isDeleted = true;
    }
  };

  // add item
  $scope.addRecord = function() {
    $scope.items.push({
      id: $scope.items.length+1,
      name: '',
      value: 0,
      period_in_days: '30',
      payment_day:12,
      isNew: true
    });
  };

  // cancel all changes
  $scope.cancel = function() {
    for (var i = $scope.items.length; i--;) {
      var item = $scope.items[i];    
      // undelete
      if (item.isDeleted) {
        delete item.isDeleted;
      }
      // remove new 
      if (item.isNew) {
        $scope.items.splice(i, 1);
      }      
    };
  };

  // save edits
  $scope.saveTable = function() {
    var results = [];
    for (var i = $scope.items.length; i--;) {
      var item = $scope.items[i];
      // actually delete item
      if (item.isDeleted) {
        $scope.items.splice(i, 1);
      }
      // mark as not new 
      if (item.isNew) {
        item.isNew = false;
      }

      // send on server
      //results.push($http.post('/saveRecord', item));      
    }

    return $q.all(results);
  };
})
;



