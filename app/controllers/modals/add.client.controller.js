'use strict';

angular.module('core').controller('AddController', ['$scope', '$rootScope', 'payment', '$modalInstance', '$timeout', function($scope, $rootScope, payment, $modalInstance, $timeout) {
    var uuid = null;
    $scope.payment = payment;
    $scope.sum_focused = false;
    $scope.expression_suggestion_selected = false;

    $scope.tabs = [
        {
            heading : 'Постоянный платеж',
            //type: 'income',
            is_regular: true,
            is_envelope: false,
            active: true
        },
        {
            heading : 'Разовый платеж',
            //type: 'income',
            is_regular: false,
            is_envelope: false,
            active: false
        },

    ];

    // $scope.__tabs = [
    //     {
    //         heading : 'Постоянный доход',
    //         type: 'income',
    //         is_regular: true,
    //         is_envelope: false,
    //         active: false
    //     },
    //     {
    //         heading : 'Разовый доход',
    //         type: 'income',
    //         is_regular: false,
    //         is_envelope: false,
    //         active: false
    //     },
    //     {
    //         heading : 'Постоянный расход',
    //         type: 'expense',
    //         is_regular: true,
    //         is_envelope: false,
    //         active: true
    //     },
    //     // {
    //     //     heading : 'Конверт',
    //     //     type: 'flow',
    //     //     is_regular: true,
    //     //     is_envelope: true,
    //     //     active: false
    //     // },
    //     {
    //         heading : 'Разовый расход',
    //         type: 'expense',
    //         is_regular: false,
    //         is_envelope: false,
    //         active: false
    //     }
    // ];

    $scope.monthly_days = [];
    for(var i = 1; i <= 31; i++) {
        $scope.monthly_days.push(i);
    }

    $scope.weekly_days = [
        {
            label: 'понедельникам',
            value: 1
        },
        {
            label: 'вторникам',
            value: 2
        },
        {
            label: 'средам',
            value: 3
        },
        {
            label: 'четвергам',
            value: 4
        },
        {
            label: 'пятницам',
            value: 5
        },
        {
            label: 'субботам',
            value: 6
        },
        {
            label: 'воскресеньям',
            value: 7
        }
    ];

    $scope.sum_keydown = function($event){
        // down pressed
        if($event.keyCode == 40) {
            $scope.expression_suggestion_selected = true;
        }

        // Enter pressed
        if($event.keyCode == 13) {
            $event.preventDefault();
            $scope.sum_expression = $scope.sum;
            $scope.sum_focused = false;
            $scope.expression_suggestion_selected = false;
            return false;
        }

        // up pressed
        if($event.keyCode == 38) {
            $event.preventDefault();
            $scope.sum_focused = false;
            $scope.expression_suggestion_selected = false;
            return false;
        }
    };


    $scope.sum_changed = false;

    $scope.on_change_sum = function(){
        $scope.sum_changed = true;
        var r = new RegExp(/(-|\/|\*|\+)/i);

        if(r.test($scope.sum_expression)) {
            try {
                var re_negative = new RegExp(/-\d+$/i);
                $scope.sum_focused = !re_negative.test($scope.sum_expression);
                $scope.sum = math.eval($scope.sum_expression);
            }
            catch(err) {
                $scope.sum_focused = false;
            }
        }
        else {
            $scope.sum_focused = false;
        }
    };

    $scope.period_changed = false;

    $scope.on_change_period = function(){
        if($scope.regular_period == 'w1') {
            $scope.regular_weekly_date = $scope.weekly_days[0];
        }

        if($scope.regular_period == 'm1') {
            $scope.regular_monthly_date = $scope.monthly_days[0];
        }

        $scope.period_changed = true;
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.remove = function() {
        $rootScope.delete_payment(payment);
        $modalInstance.close();
    };

    $scope.reset = function() {
        $scope.errorText = '';
        $scope.is_regular = true;
        $scope.regular_period = 'm1';
        $scope.regular_monthly_date = $scope.monthly_days[0];
        $scope.regular_weekly_date = $scope.weekly_days[0];
        $scope.date = new Date();
        //$scope.income = 10;
        //$scope.flow = -20;
        $scope.type = 'expense';
        $scope.sum = 20;
        $scope.name = $rootScope.prefs.defaultNames[Math.floor(Math.random()*$rootScope.prefs.defaultNames.length)],
        $scope.payment_not_null = false;
        $scope.days = [];
        $scope.is_envelope = false;
        $scope.regular_period_selected = $rootScope.prefs.regular_periods[0];
        $scope.day_items = $rootScope.prefs.regular_periods[0].items;
        $rootScope.prefs.itemLabel = $rootScope.prefs.labels[0];
        $scope.sum_expression = $scope.sum;
        // if($scope.type == 'expense') {
        //     $scope.sum = -1 * $scope.sum;
        // }

        for(var i = 1; i <= 31; i++){
            $scope.days.push(i);
        }

        $scope.tabs[1].active = true; // По умолчанию третья вкладка (постоянный расход) включена в окне добавления записи
    };

    $scope.isSelected = function(id){
        angular.forEach($scope.days, function(value, index){
          if(id == value){
              return true;
          }
        });
        return false;
     };

    $scope.open = function($event) { // datepicker button for calendar
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.getDays = function(id){
        angular.forEach($rootScope.prefs.regular_periods, function(period, index){
            if(period.value == id) {
                $scope.regular_period_selected = period;

                if(jQuery.inArray( $scope.regular_date, $scope.regular_period_selected.items ) == -1){
                    $scope.regular_date = $scope.regular_period_selected.items[0];
                }
                return;
            }
        });
    };

    // $scope.switchToTab = function(type, is_regular, is_envelope){
    //     $scope.type = type;

    //     if(!$scope.sum_changed && !payment_is_not_null()) {
    //         $scope.sum = $scope.type == 'expense' ? 20 : 10;
    //     }

    //     $scope.is_regular = is_regular;
    //     $scope.is_envelope = is_envelope;

    //     if(payment_is_not_null()) {
    //         if(payment.regular && !is_regular) {
    //             $scope.period_changed = true;
    //         }

    //         if(payment.casual && is_regular) {
    //             $scope.period_changed = true;
    //         }
    //     }
    // };

    $scope.payment_data = {};

    $scope.appendItem = function() {
        $scope.sum = $scope.sum_expression;

        if($scope.sum == 0 || $scope.sum == null || $scope.date == undefined) {
            $scope.errorText = 'Ошибка';
            return;
        }

        $scope.dateOptions = $rootScope.prefs.dateOptions; // datepicker

        $scope.label = $rootScope.prefs.itemLabel;

        if($scope.regular_period_selected.value == 'w1') {
            $scope.regular_weekly_date = parseInt(document.getElementById('regular_weekly_date').value, 10) + 1;
        }

        if($scope.regular_period_selected.value == 'm1') {
            $scope.regular_monthly_date = parseInt(document.getElementById('regular_monthly_date').value, 10) + 1;
        }

        $scope.payment_data = {
            regular: $scope.is_regular,
            casual: !$scope.is_regular,
            monthly: $scope.regular_period == 'm1' && $scope.is_regular,
            weekly: $scope.regular_period == 'w1' && $scope.is_regular,
            daily: $scope.regular_period == 'd1' && $scope.is_regular,
            regular_period: $scope.regular_period,
            regular_date: $scope.regular_period_selected.value == 'm1' ? $scope.regular_monthly_date : $scope.regular_weekly_date,
            sum: $scope.sum, //$scope.type == 'income' ? value : value * (-1),
            name: $scope.name,
            date: $scope.date,
            label: $scope.label
        };

        //if($scope.period_changed) {
            fix_payments_num_values();
        //}

        $timeout(function(){
            $scope.$broadcast('handle_append_payment');
        }, 0);
        close();
    };

    $scope.$on('handle_append_payment', function(){
        if(payment_is_not_null()) {
            payment.update($scope.payment_data);
        }
        else {
            $rootScope.add_payment($scope.payment_data);
        }
        $rootScope.save_data();
    });

    $scope.reset();

    if(payment_is_not_null()) {
        $scope.is_regular = payment.regular;
        $scope.regular_period = payment.regular_period;
        $scope.regular_date = payment.regular_date;
        $scope.regular_monthly_date = payment.regular_date;
        $scope.regular_weekly_date = $scope.weekly_days[payment.regular_date - 1];
        $scope.date = payment.hasOwnProperty('date') ? payment.date : '';
        $scope.type = payment.type == 'income' ? 'income' : 'expense';
        $scope.is_envelope = payment.is_envelope;
        $scope.label = payment.label;
        $rootScope.prefs.itemLabel = payment.label;

        $scope.income = payment.sum;
        $scope.flow = payment.sum;
        $scope.sum = payment.sum; //Math.abs(payment.sum);
        $scope.sum_expression = $scope.sum;
        if($scope.type == 'expense') {
            $scope.sum = -1 * $scope.sum;
        }

        $scope.payment_not_null = true;
        $scope.name = payment.name;

        $scope.tabs.forEach(function(tab, tab_i){
            tab.active = tab_is_active(tab);
        });
    }

    function fix_payments_num_values() {
        if(!payment_is_not_null()) {
            return;
        }
        var original_payment = $scope.payment,
            new_payment = $scope.payment_data;

        // if(original_payment.sum > 0 && new_payment.sum > 0 && original_payment.regular == new_payment.regular) {
        //     return;
        // }

        // if(original_payment.sum < 0 && new_payment.sum < 0 && original_payment.regular == new_payment.regular) {
        //     return;
        // }

        if(new_payment.sum > 0 && original_payment.sum < 0) {
            if(new_payment.regular && original_payment.casual) {
                $rootScope.casual_expenses_num -= 1;
                $rootScope.regular_incomes_num += 1;
            }
            if(new_payment.casual && original_payment.regular) {
                $rootScope.regular_expenses_num -= 1;
                $rootScope.casual_incomes_num += 1;
            }
            if(new_payment.regular && original_payment.regular) {
                $rootScope.regular_incomes_num += 1;
                $rootScope.regular_expenses_num -= 1;
            }
            if(new_payment.casual && original_payment.casual) {
                $rootScope.casual_incomes_num += 1;
                $rootScope.casual_expenses_num -= 1;
            }
        }
        else if(new_payment.sum < 0 && original_payment.sum > 0) {
            if(new_payment.regular && original_payment.casual) {
                $rootScope.casual_incomes_num -= 1;
                $rootScope.regular_expenses_num += 1;
            }
            if(new_payment.casual && original_payment.regular) {
                $rootScope.regular_incomes_num -= 1;
                $rootScope.casual_expenses_num += 1;
            }
            if(new_payment.regular && original_payment.regular) {
                $rootScope.regular_incomes_num -= 1;
                $rootScope.regular_expenses_num += 1;
            }
            if(new_payment.casual && original_payment.casual) {
                $rootScope.casual_incomes_num -= 1;
                $rootScope.casual_expenses_num += 1;
            }            
        }
        else if(new_payment.sum > 0 && original_payment.sum > 0){
            if(new_payment.regular && original_payment.casual) {
                $rootScope.regular_incomes_num += 1;
                $rootScope.casual_incomes_num -= 1;
            }
            if(new_payment.casual && original_payment.regular) {
                $rootScope.casual_incomes_num += 1;
                $rootScope.regular_incomes_num -= 1;
            }
        }
        else if(new_payment.sum < 0 && original_payment.sum < 0) {
            if(new_payment.regular && original_payment.casual) {
                $rootScope.regular_expenses_num += 1;
                $rootScope.casual_expenses_num -= 1;
            }
            if(new_payment.casual && original_payment.regular) {
                $rootScope.casual_expenses_num += 1;
                $rootScope.regular_expenses_num -= 1;
            }
        }
    }

    function tab_is_active(tab){
        if ($scope.type != tab.type) {
            return false;
        }

        if($scope.is_regular != tab.is_regular) {
            return false;
        }

        return true;
    }

    function payment_is_not_null(){
        return typeof(payment) != 'undefined' && payment != null;
    }

    function close(){
        if($rootScope.autosave) {
            $rootScope.save_data();
        }

        $modalInstance.close();
    }
}]);
