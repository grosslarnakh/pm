angular.module('core').factory('Expense', ['$rootScope', function($rootScope){
    function Expense(){

    };

    Expense.prototype = {
        name: null,
        sum: 0
    };

    return Expense;
}]);