// 'use strict';

// angular.module('core').controller('ExportController', ['$scope', '$rootScope', '$window', '$document', '$timeout', function($scope, $rootScope, $window, $document, $timeout){

//     $rootScope.autosave = false;
//     if(localStorage.hasOwnProperty('autosave')) {
//         var autosaveVal = localStorage.getItem('autosave');
//         $rootScope.autosave = JSON.parse(autosaveVal);
//     }

//     $rootScope.save_data = function(){
//         var data = {
//             default_weeks_num: $rootScope.default_weeks_num,
//             start_date: $rootScope.prefs.startDate,
//             start_value: $rootScope.prefs.startValue,
//             payments: $rootScope.payments
//         };
//         localStorage.setItem('user_data', JSON.stringify(data));
//         //$rootScope.addNotice('Данные сохранены в LocalStorage');
//     };


//     $rootScope.clearStorageData = function(){
//         if(localStorage.hasOwnProperty('user_data')) {
//             localStorage.removeItem('user_data');
//             $rootScope.addNotice('Данные о пользовательских настройках удалены из LocalStorage');
//         }
//     };

//     $rootScope.dataIsNotEmpty = function(){
//         return $rootScope.payment.length != 0;
//     };

//     $rootScope.storageDataIsNotEmpty = function(){
//         return localStorage.hasOwnProperty('user_data');
//     };

//     $rootScope.changeAutosave = function(val){
//         localStorage.setItem('autosave', val);
//         $rootScope.autosave = val;

//         if($rootScope.autosave) {
//             $rootScope.save_data();
//         }
//     };
// }]);
