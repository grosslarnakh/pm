var weeksProvider = ['$rootScope', 'Week', function($rootScope, Week){
    function WeeksProvider(){
        this.create_weeks();
    };

    WeeksProvider.prototype = {
        default_weeks_num: 16,
        weeks: [],
        weeks_num: 0,
        scope: this,
        get_weeks: function(){
            return this.weeks;
        },
        add_week: function(){
            var week_data = {
                previous_week: this.last_week()
            };
            var week = new Week(week_data);

            if(this.weeks_num > 0) {
                week.set_previous_week(this.weeks[this.weeks_num - 1]);
            }

            this.weeks.push(week);
            this.weeks_num++;
        },
        last_week: function(){
            if(this.weeks_num == 0) {
                return null;
            }

            return this.weeks[this.weeks_num - 1];
        },
        create_weeks: function(week_nums){
            week_nums = typeof(week_nums) == 'undefined' ? this.default_weeks_num() : week_nums;

            var week_num = 0;
            while(week_num < week_nums) {
                this.add_week();
                week_num++;
            }
        },
        default_weeks_num: function(){
            return $rootScope.default_weeks_num;
        },
        rebuild_weeks: function(){
            this.weeks = [];
            this.weeks_num = 0;
            this.create_weeks();
        },
        add_payment: function(payment){
            this.weeks.forEach(function(week, week_i){
                week.set_payment(payment);
            });            
            // if(payment.sum > 0) {
            //     this.add_income(payment);
            // }
            // else {
            //     this.add_expense(payment);
            // }
        },
        rebuild_weeks_payments: function(){
            this.weeks.forEach(function(week, week_i){
                week.payments = [];
                //week.incomes = [];
                //week.expenses = [];
                week.set_payments();
                // week.set_incomes();
                // week.set_expenses();
            });
        },
        add_income: function(income){
            this.weeks.forEach(function(week, week_i){
                week.set_income(income);
            });

        },
        add_expense: function(expense){
            this.weeks.forEach(function(week, week_i){
                week.set_expense(expense);
            });
        },
        delete_payment: function(payment){
            this.weeks.forEach(function(week, week_i){
                week.delete_payment(payment);
            });
        }
    };

    return WeeksProvider;
}];


// angular.module('core').factory('WeeksProvider', ['$rootScope', 'Week', function($rootScope, Week){
//     function WeeksProvider(){
//         this.create_weeks();
//     };

//     WeeksProvider.prototype = {
//         default_weeks_num: 16,
//         weeks: [],
//         weeks_num: 0,
//         scope: this,
//         get_weeks: function(){
//             return this.weeks;
//         },
//         add_week: function(){
//             var week_data = {
//                 previous_week: this.last_week()
//             };
//             var week = new Week(week_data);

//             if(this.weeks_num > 0) {
//                 week.set_previous_week(this.weeks[this.weeks_num - 1]);
//             }

//             this.weeks.push(week);
//             this.weeks_num++;
//         },
//         last_week: function(){
//             if(this.weeks_num == 0) {
//                 return null;
//             }

//             return this.weeks[this.weeks_num - 1];
//         },
//         create_weeks: function(week_nums){
//             week_nums = typeof(week_nums) == 'undefined' ? this.default_weeks_num() : week_nums;

//             var week_num = 0;
//             while(week_num < week_nums) {
//                 this.add_week();
//                 week_num++;
//             }
//         },
//         default_weeks_num: function(){
//             return $rootScope.default_weeks_num;
//         },
//         rebuild_weeks: function(){
//             this.weeks = [];
//             this.weeks_num = 0;
//             this.create_weeks();
//         },
//         add_payment: function(payment){
//             this.weeks.forEach(function(week, week_i){
//                 week.set_payment(payment);
//             });            
//             // if(payment.sum > 0) {
//             //     this.add_income(payment);
//             // }
//             // else {
//             //     this.add_expense(payment);
//             // }
//         },
//         rebuild_weeks_payments: function(){
//             this.weeks.forEach(function(week, week_i){
//                 week.payments = [];
//                 //week.incomes = [];
//                 //week.expenses = [];
//                 week.set_payments();
//                 // week.set_incomes();
//                 // week.set_expenses();
//             });
//         },
//         add_income: function(income){
//             this.weeks.forEach(function(week, week_i){
//                 week.set_income(income);
//             });

//         },
//         add_expense: function(expense){
//             this.weeks.forEach(function(week, week_i){
//                 week.set_expense(expense);
//             });
//         },
//         delete_payment: function(payment){
//             this.weeks.forEach(function(week, week_i){
//                 week.delete_payment(payment);
//             });
//         }
//     };

//     return WeeksProvider;
// }]);