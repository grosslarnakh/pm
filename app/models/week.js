var week = ['$rootScope', 'Day', function($rootScope, Day){
    function Week(week_data){
        this.first_day = null;
        this.last_day = null;
        this.days = [];
        this.payments = [];
        this.previous_week = week_data.previous_week;

        this.init();
    };

    Week.prototype = {
        first_day: null,
        last_day: null,
        first_in_month: false,
        set_first_day: function(){
            if(this.previous_week != null) {
                var prev_last_day = this.previous_week.last_day;
                this.first_day = new Date(prev_last_day.getFullYear(), prev_last_day.getMonth(), prev_last_day.getDate() + 1);
                
                return;
            }

            this.first_day = this.start_date();
        },
        set_last_day: function(){
            var days_diff = 6;
            if(this.first_day.getDay() == 0) {
                this.last_day = this.first_day;
                return;
            }
            else {
                days_diff = 7 - this.first_day.getDay();
            }

            this.last_day = new Date(this.first_day.getFullYear(), this.first_day.getMonth(), this.first_day.getDate() + days_diff);
        },
        set_previous_week: function(previous_week){
            this.previous_week = previous_week;
        },
        check_if_first_in_month: function(){
            if(this.previous_week == null) {
                this.first_in_month = true;
                return;
            }

            this.first_in_month = this.first_day.getMonth() != this.previous_week.first_day.getMonth();
        },
        start_date: function(){
            return $rootScope.prefs.startDate;
        },
        set_payments: function(){
            var scope = this;
            $rootScope.payments.forEach(function(payment, payment_i){
                scope.set_payment(payment);
            });
        },
        set_payment: function(payment){
            if(payment.casual) {
                if(this.week_has_date(payment.date)) {
                    this.payments.push(payment);
                }
            }

            if(payment.monthly) {
                if(this.payment_belongs_to_week(payment.regular_date)) {
                    this.payments.push(payment);
                }
            }

            if(payment.weekly) {
                if(this.payment_should_not_be_taken(payment.regular_date)) {
                    return;
                }
                this.payments.push(payment);
            }

            if(payment.daily) {
                this.payments.push(payment);
            }
        },
        set_money: function(){
            this.set_payments();
        },
        init: function(){
            this.set_first_day();
            this.set_last_day();
            this.check_if_first_in_month();
            this.set_money();
            this.set_days();
        },
        first_and_last_days_months_same: function(){
            return this.first_day.getMonth() == this.last_day.getMonth();
        },
        set_days: function(){
            var week_length = 8 - this.first_day.getDay();
            if(this.first_day.getDay() == 0) {
                week_length = 1;
            }

            var scope = this;
            for(var i = 0; i < week_length; i++) {
                var date = new Date(scope.first_day.getFullYear(), scope.first_day.getMonth(), scope.first_day.getDate() + i);

                var day = new Day();
                day.set_date(date);
                scope.days.push(day);
            }
        },
        payment_belongs_to_week: function(payment_date){
            if(this.first_day.getMonth() != this.last_day.getMonth()) {
                if(payment_date >= this.first_day.getDate() || payment_date <= this.last_day.getDate()) {
                    return true;
                }
            }
            else {
                if(payment_date >= this.first_day.getDate() && payment_date <= this.last_day.getDate()) {
                    return true;
                }
            }

            return false;
        },
        payment_should_not_be_taken: function(payment_date){
            var first_day_day = this.first_day.getDay();
            if(first_day_day == 0) {
                first_day_day = 7;
            }

            if(first_day_day == 7 && payment_date != 7) {
                return true;
            }

            if(payment_date < first_day_day) {
                return true;
            }

            return false;
        },
        week_has_date: function(date){
            if(date.getMonth() != this.first_day.getMonth() && date.getMonth() != this.last_day.getMonth()) {
                return false;
            }

            if(date.getFullYear() != this.first_day.getFullYear() && date.getFullYear() != this.last_day.getFullYear()) {
                return false;
            }

            return this.payment_belongs_to_week(date.getDate());
        },
        delete_payment: function(payment){
            if(payment.is_income()) {
                this.delete_income(payment);
            }
            else {
                this.delete_expense(payment);
            }
        },
        delete_income: function(income){
            this.incomes.splice(this.incomes.indexOf(income), 1);
        },
        delete_expense: function(expense){
            this.expenses.splice(this.expenses.indexOf(expense), 1);
        },
        delete_payment: function(payment){
            this.payments.splice(this.payments.indexOf(payment), 1);
        }
    };

    return Week;
}];


// angular.module('core').factory('Week', ['$rootScope', 'Day', function($rootScope, Day){
//     function Week(week_data){
//         this.first_day = null;
//         this.last_day = null;
//         this.days = [];
//         this.payments = [];
//         this.previous_week = week_data.previous_week;

//         this.init();
//     };

//     Week.prototype = {
//         first_day: null,
//         last_day: null,
//         first_in_month: false,
//         set_first_day: function(){
//             if(this.previous_week != null) {
//                 var prev_last_day = this.previous_week.last_day;
//                 this.first_day = new Date(prev_last_day.getFullYear(), prev_last_day.getMonth(), prev_last_day.getDate() + 1);
                
//                 return;
//             }

//             this.first_day = this.start_date();
//         },
//         set_last_day: function(){
//             var days_diff = 6;
//             if(this.first_day.getDay() == 0) {
//                 this.last_day = this.first_day;
//                 return;
//             }
//             else {
//                 days_diff = 7 - this.first_day.getDay();
//             }

//             this.last_day = new Date(this.first_day.getFullYear(), this.first_day.getMonth(), this.first_day.getDate() + days_diff);
//         },
//         set_previous_week: function(previous_week){
//             this.previous_week = previous_week;
//         },
//         check_if_first_in_month: function(){
//             if(this.previous_week == null) {
//                 this.first_in_month = true;
//                 return;
//             }

//             this.first_in_month = this.first_day.getMonth() != this.previous_week.first_day.getMonth();
//         },
//         start_date: function(){
//             return $rootScope.prefs.startDate;
//         },
//         set_payments: function(){
//             var scope = this;
//             $rootScope.payments.forEach(function(payment, payment_i){
//                 scope.set_payment(payment);
//             });
//         },
//         set_payment: function(payment){
//             if(payment.casual) {
//                 if(this.week_has_date(payment.date)) {
//                     this.payments.push(payment);
//                 }
//             }

//             if(payment.monthly) {
//                 if(this.payment_belongs_to_week(payment.regular_date)) {
//                     this.payments.push(payment);
//                 }
//             }

//             if(payment.weekly) {
//                 if(this.payment_should_not_be_taken(payment.regular_date)) {
//                     return;
//                 }
//                 this.payments.push(payment);
//             }

//             if(payment.daily) {
//                 this.payments.push(payment);
//             }
//         },
//         set_money: function(){
//             this.set_payments();
//         },
//         init: function(){
//             this.set_first_day();
//             this.set_last_day();
//             this.check_if_first_in_month();
//             this.set_money();
//             this.set_days();
//         },
//         first_and_last_days_months_same: function(){
//             return this.first_day.getMonth() == this.last_day.getMonth();
//         },
//         set_days: function(){
//             var week_length = 8 - this.first_day.getDay();
//             if(this.first_day.getDay() == 0) {
//                 week_length = 1;
//             }

//             var scope = this;
//             for(var i = 0; i < week_length; i++) {
//                 var date = new Date(scope.first_day.getFullYear(), scope.first_day.getMonth(), scope.first_day.getDate() + i);

//                 var day = new Day();
//                 day.set_date(date);
//                 scope.days.push(day);
//             }
//         },
//         payment_belongs_to_week: function(payment_date){
//             if(this.first_day.getMonth() != this.last_day.getMonth()) {
//                 if(payment_date >= this.first_day.getDate() || payment_date <= this.last_day.getDate()) {
//                     return true;
//                 }
//             }
//             else {
//                 if(payment_date >= this.first_day.getDate() && payment_date <= this.last_day.getDate()) {
//                     return true;
//                 }
//             }

//             return false;
//         },
//         payment_should_not_be_taken: function(payment_date){
//             var first_day_day = this.first_day.getDay();
//             if(first_day_day == 0) {
//                 first_day_day = 7;
//             }

//             if(first_day_day == 7 && payment_date != 7) {
//                 return true;
//             }

//             if(payment_date < first_day_day) {
//                 return true;
//             }

//             return false;
//         },
//         week_has_date: function(date){
//             if(date.getMonth() != this.first_day.getMonth() && date.getMonth() != this.last_day.getMonth()) {
//                 return false;
//             }

//             if(date.getFullYear() != this.first_day.getFullYear() && date.getFullYear() != this.last_day.getFullYear()) {
//                 return false;
//             }

//             return this.payment_belongs_to_week(date.getDate());
//         },
//         delete_payment: function(payment){
//             if(payment.is_income()) {
//                 this.delete_income(payment);
//             }
//             else {
//                 this.delete_expense(payment);
//             }
//         },
//         delete_income: function(income){
//             this.incomes.splice(this.incomes.indexOf(income), 1);
//         },
//         delete_expense: function(expense){
//             this.expenses.splice(this.expenses.indexOf(expense), 1);
//         },
//         delete_payment: function(payment){
//             this.payments.splice(this.payments.indexOf(payment), 1);
//         }
//     };

//     return Week;
// }]);