var day = ['$rootScope', function($rootScope){
    function Day(){
        this.date = null;
    }

    Day.prototype = {
        set_date: function(date){
            this.date = date;
        }
    };

    return Day;
}];

// angular.module('core').factory('Day', ['$rootScope', function($rootScope){
//     function Day(){
//         this.date = null;
//     }

//     Day.prototype = {
//         set_date: function(date){
//             this.date = date;
//         }
//     };

//     return Day;
// }]);