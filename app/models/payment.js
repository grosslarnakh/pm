var payment = ['$rootScope', function($rootScope){
    var types = {
        income: 'income',
        expense: 'expense'
    };

    function Payment(payment_data){
        this.day_date = null,
        this.casual = false,
        this.regular = false;
        this.init(payment_data);

        this.set_regularity();
        this.set_period();
    };

    Payment.prototype = {
        monthly: false,
        weekly: false,
        daily: false,
        date: null,
        init: function(payment_data){
            this.payment_data = payment_data;
            this.name = payment_data.name,
            this.sum = payment_data.sum,
            this.type = payment_data.sum > 0 ? types.income : types.expense,
            this.label = $rootScope.prefs.itemLabel,
            this.date = payment_data.date,
            this.regular_date = payment_data.regular_date,
            this.regular_period = payment_data.regular_period,
            this.monthly= payment_data.monthly,
            this.weekly = payment_data.weekly,
            this.daily = payment_data.daily,
            this.index = typeof(payment_data.index) != 'undefined' ? payment_data.index : null,
            this.label = payment_data.label;
            this.set_regularity();
        },
        is_income: function(){
            return this.sum > 0;
        },
        is_expense: function(){
            return this.sum < 0;
        },
        set_regularity: function(){
            if(typeof(this.payment_data.regular) != 'undefined') {
                this.regular = this.payment_data.regular;
            }

            if(typeof(this.payment_data.casual) != 'undefined') {
                this.casual = this.payment_data.casual;
            }
        },
        set_period: function(){
            if(typeof(this.payment_data.monthly) != 'undefined') {
                this.monthly = this.payment_data.monthly;
            }

            if(typeof(this.payment_data.weekly) != 'undefined') {
                this.weekly = this.payment_data.weekly;
            }

            if(typeof(this.payment_data.daily) != 'undefined') {
                this.daily = this.payment_data.daily;
            }
        },
        set_index: function(index){
            this.index = index;
        },
        update: function(payment_data){
            this.init(payment_data);
            $rootScope.weeks_provider.rebuild_weeks_payments();
            $rootScope.save_data();
            $rootScope.after_change_payment(payment_data);
        },
        payment_date: function(week){
            if(this.monthly) {
                return this.monthly_payment_date(week);
            }

            if(this.weekly) {
                return this.weekly_payment_date(week);
            }

            if(this.casual) {
                return this.date;
            }
        },
        monthly_payment_date: function(week){
            var base_day = week.first_day;
            if(!week.first_and_last_days_months_same()) {
                if(this.regular_date <= week.last_day.getDate()) {
                    base_day = week.last_day;
                }
            }

            return this.monthly_payment_date_by_day(base_day);
        },
        monthly_payment_date_by_day: function(day){
            return new Date(day.getFullYear(), day.getMonth(), this.regular_date);
        },
        weekly_payment_date: function(week){
            var first_day = week.first_day,
            first_day_day = first_day.getDay();

            if(first_day_day == 1 && this.regular_date == 1) {
                return first_day;
            }
            else {
                if(first_day_day == 0 && this.regular_date == 7) {
                    return first_day;
                }

                var date = new Date(first_day.getFullYear(), first_day.getMonth(), first_day.getDate() + (this.regular_date - first_day_day));
                return date;
            }
        },
        daily_payment_date: function(week, day_num){
            return new Date(week.first_day.getFullYear(), week.first_day.getMonth(), week.first_day.getDate() + day_num);
        },
        belongs_to_day: function(day, week){
            var day_date = day.date;
            if(this.daily) {
                return true;
            }

            if(this.weekly) {
                if(this.regular_date == 7 && day_date.getDay() == 0) {
                    return true;
                }
                return this.regular_date == day_date.getDay();
            }

            if(this.monthly) {
                if(this.regular_date > day_date.getDate()){
                    var day_date_next = new Date(day_date.getFullYear(), day_date.getMonth(), day_date.getDate() + 1);
                    if(day_date_next.getMonth() != day_date.getMonth()) {
                        return true;
                    }
                }
                
                return this.regular_date == day_date.getDate();
            }

            if(this.casual) {
                return this.date.getFullYear() == day_date.getFullYear() && 
                       this.date.getMonth() == day_date.getMonth() && 
                       this.date.getDate() == day_date.getDate();
            }

            return false;
        },
        week_day_name: function(){
            var week_days_hash = {
                1: 'понедельникам',
                2: 'вторникам',
                3: 'средам',
                4: 'четвергам',
                5: 'пятницам',
                6: 'субботам',
                7: 'воскресеньям'
            };

            return week_days_hash[this.regular_date];
        }
    };

    return Payment;
}];

// angular.module('core').factory('Payment', ['$rootScope', function($rootScope){
//     var types = {
//         income: 'income',
//         expense: 'expense'
//     };

//     function Payment(payment_data){
//         this.day_date = null,
//         this.casual = false,
//         this.regular = false;
//         this.init(payment_data);

//         this.set_regularity();
//         this.set_period();
//     };

//     Payment.prototype = {
//         monthly: false,
//         weekly: false,
//         daily: false,
//         date: null,
//         init: function(payment_data){
//             this.payment_data = payment_data;
//             this.name = payment_data.name,
//             this.sum = payment_data.sum,
//             this.type = payment_data.sum > 0 ? types.income : types.expense,
//             this.label = $rootScope.prefs.itemLabel,
//             this.date = payment_data.date,
//             this.regular_date = payment_data.regular_date,
//             this.regular_period = payment_data.regular_period,
//             this.monthly= payment_data.monthly,
//             this.weekly = payment_data.weekly,
//             this.daily = payment_data.daily,
//             this.index = typeof(payment_data.index) != 'undefined' ? payment_data.index : null,
//             this.label = payment_data.label;
//             this.set_regularity();
//         },
//         is_income: function(){
//             return this.sum > 0;
//         },
//         is_expense: function(){
//             return this.sum < 0;
//         },
//         set_regularity: function(){
//             if(typeof(this.payment_data.regular) != 'undefined') {
//                 this.regular = this.payment_data.regular;
//             }

//             if(typeof(this.payment_data.casual) != 'undefined') {
//                 this.casual = this.payment_data.casual;
//             }
//         },
//         set_period: function(){
//             if(typeof(this.payment_data.monthly) != 'undefined') {
//                 this.monthly = this.payment_data.monthly;
//             }

//             if(typeof(this.payment_data.weekly) != 'undefined') {
//                 this.weekly = this.payment_data.weekly;
//             }

//             if(typeof(this.payment_data.daily) != 'undefined') {
//                 this.daily = this.payment_data.daily;
//             }
//         },
//         set_index: function(index){
//             this.index = index;
//         },
//         update: function(payment_data){
//             this.init(payment_data);
//             $rootScope.weeks_provider.rebuild_weeks_payments();
//             $rootScope.save_data();
//             $rootScope.after_change_payment(payment_data);
//         },
//         payment_date: function(week){
//             if(this.monthly) {
//                 return this.monthly_payment_date(week);
//             }

//             if(this.weekly) {
//                 return this.weekly_payment_date(week);
//             }

//             if(this.casual) {
//                 return this.date;
//             }
//         },
//         monthly_payment_date: function(week){
//             var base_day = week.first_day;
//             if(!week.first_and_last_days_months_same()) {
//                 if(this.regular_date <= week.last_day.getDate()) {
//                     base_day = week.last_day;
//                 }
//             }

//             return this.monthly_payment_date_by_day(base_day);
//         },
//         monthly_payment_date_by_day: function(day){
//             return new Date(day.getFullYear(), day.getMonth(), this.regular_date);
//         },
//         weekly_payment_date: function(week){
//             var first_day = week.first_day,
//             first_day_day = first_day.getDay();

//             if(first_day_day == 1 && this.regular_date == 1) {
//                 return first_day;
//             }
//             else {
//                 if(first_day_day == 0 && this.regular_date == 7) {
//                     return first_day;
//                 }

//                 var date = new Date(first_day.getFullYear(), first_day.getMonth(), first_day.getDate() + (this.regular_date - first_day_day));
//                 return date;
//             }
//         },
//         daily_payment_date: function(week, day_num){
//             return new Date(week.first_day.getFullYear(), week.first_day.getMonth(), week.first_day.getDate() + day_num);
//         },
//         belongs_to_day: function(day, week){
//             var day_date = day.date;
//             if(this.daily) {
//                 return true;
//             }

//             if(this.weekly) {
//                 if(this.regular_date == 7 && day_date.getDay() == 0) {
//                     return true;
//                 }
//                 return this.regular_date == day_date.getDay();
//             }

//             if(this.monthly) {
//                 if(this.regular_date > day_date.getDate()){
//                     var day_date_next = new Date(day_date.getFullYear(), day_date.getMonth(), day_date.getDate() + 1);
//                     if(day_date_next.getMonth() != day_date.getMonth()) {
//                         return true;
//                     }
//                 }
                
//                 return this.regular_date == day_date.getDate();
//             }

//             if(this.casual) {
//                 return this.date.getFullYear() == day_date.getFullYear() && 
//                        this.date.getMonth() == day_date.getMonth() && 
//                        this.date.getDate() == day_date.getDate();
//             }

//             return false;
//         },
//         week_day_name: function(){
//             var week_days_hash = {
//                 1: 'понедельникам',
//                 2: 'вторникам',
//                 3: 'средам',
//                 4: 'четвергам',
//                 5: 'пятницам',
//                 6: 'субботам',
//                 7: 'воскресеньям'
//             };

//             return week_days_hash[this.regular_date];
//         }
//     };

//     return Payment;
// }]);
