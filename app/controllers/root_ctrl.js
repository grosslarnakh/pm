var rootCtrl = ['$scope', '$rootScope', '$modal', '$http', '$interval', 'WeeksProvider', 'Payment', function($scope, $rootScope, $modal, $http, $interval, WeeksProvider, Payment) {

    $rootScope.locale = 'ru';

    $rootScope.tr = tr;
    $rootScope.l = tr[$rootScope.locale];

    //var modals = new Modals();
    $rootScope.payments = [];
    $rootScope.yearsWeeks = {};
    $rootScope.dataTable = [];
    $rootScope.items = [];
    $rootScope.regular_items = [];
    $rootScope.total_spending = 0;
    $rootScope.default_weeks_num = 16;
    $scope.pref = 'fuck';

    if(typeof(prefpath) == 'undefined') {
        prefpath = '';
    }

    $rootScope.templates = {
        index: prefpath + 'app/views/home.html',
        toolbar: prefpath + 'app/views/shared/_toolbar.html',
        view_mode: prefpath + 'app/views/shared/_view.mode.html',
        view_modes: {
            tree: prefpath + 'app/views/shared/view_modes/_tree_mode.html',
            table: prefpath + 'app/views/shared/view_modes/_table_mode.html',
            list: prefpath + 'app/views/shared/view_modes/_list_mode.html'
        },
        export_import: prefpath + 'app/views/shared/_export.import.html'
    };

    $interval(function(){
        var view_mode_id = 'tree_view_mode';;
        if($rootScope.prefs.viewMode == 'table') {
            view_mode_id = 'tree_view_mode';
        }
        if($rootScope.prefs.viewMode == 'table-2') {
            view_mode_id = 'table_view_mode';
        }
        if($rootScope.prefs.viewMode == 'list') {
            view_mode_id = 'list_view_mode';
        }
        var view_mode_block = document.getElementById(view_mode_id);
        if(view_mode_block) {
            var sum_blocks = view_mode_block.getElementsByClassName('expense_sum');
            var sum = $rootScope.prefs.startValue;
            for(var i = 0; i < sum_blocks.length; i++) {
                sum += parseInt(sum_blocks[i].getAttribute('data-sum'));
                sum_blocks[i].innerText = sum;
            }
        }

    }, 2000);

    $interval(function(){
        setTimeout(function() {
            fix_days_repeating();
        }, 0);
    }, 100);

    function fix_days_repeating(){
        var days = document.getElementsByClassName('week_day');
        for(var i = 0; i < days.length; i++) {
            var dates = days[i].getElementsByClassName('day_date');
            for(var j = 0; j < dates.length; j++){
                if(j > 0) {
                    if(dates[j].innerText == dates[j-1].innerText) {
                        dates[j].style.display = 'none';
                    }
                }
            }
        }
    }

    $rootScope.decimalsOutput = function(num){
        return num;
        // var str = num.toString().split('.');
        //     if (str[0].length >= 5) {
        //         str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        //     }
        //     if (str[1] && str[1].length >= 5) {
        //         str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        //     }
        //     return str.join(',');

        //return( (""+num).replace(/\B(?=(\d{3})+(?!\d))/g, " ") );
    };

    $rootScope.addWeeks = function(){
        $rootScope.weeks_provider.create_weeks(4);
        $rootScope.default_weeks_num += 4;
    }

    $rootScope.options = {};

    $rootScope.total_income = 0;
    $rootScope.incomes_num = 0;
    $rootScope.regular_incomes_num = 0;
    $rootScope.casual_incomes_num = 0;
    $rootScope.total_expense = 0;
    $rootScope.expenses_num = 0;
    $rootScope.regular_expenses_num = 0;
    $rootScope.casual_expenses_num = 0;

    var now = new Date();

    $rootScope.prefs = {
        startDate: new Date(),
        currentDate: new Date(),
        weekPrice: 131,
        startValue: 0,

        IncomesOrdinary: 0,
        IncomesRegular: 0,

        FlowsOrdinary: 0,
        FlowsRegular: 0,

        isSetWeekPrice: false,

        dateOptions: {
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: false,
            formatDay: 'd'
        },

        regular_periods: [
            {
                value: 'm1',
                name: 'Раз в месяц',
                items: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
            },
            {
                value: 'w1',
                name: 'Раз в неделю',
                items: [
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
                ]
            },
            //{ value: 'w2',
            //  name: 'Раз в две недели',
            //  items: [
            //      '1','2','3','4','5','6','7','8','9','10','11','12','13','14'
            //  ]
            //},
            { value: 'd1', name: 'Ежедневно', items: []}
        ],

        regular_period_selected : {},

        viewMode: "table",

        defaultNames: [
        "Андромеда", "Близнецы", "Большая Медведица", "Большой Пёс", "Весы", "Водолей", "Возничий", "Волк",
        "Волопас", "Волосы Вероники", "Ворон", "Геркулес", "Гидра", "Голубь", "Гончие Псы", "Дева", "Дельфин",
        "Дракон", "Единорог", "Жертвенник", "Живописец", "Жираф", "Журавль", "Заяц", "Змееносец", "Змея",
        "Золотая Рыба", "Индеец", "Кассиопея", "Киль", "Кит", "Козерог", "Компас", "Корма", "Лебедь", "Лев",
        "Летучая Рыба", "Лира", "Лисичка", "Малая Медведица", "Малый Конь", "Малый Лев", "Малый Пёс", "Микроскоп",
        "Муха", "Насос", "Наугольник", "Овен", "Октант", "Орёл", "Орион", "Павлин", "Паруса", "Пегас", "Персей",
        "Печь", "Райская Птица", "Рак", "Резец", "Рыбы", "Рысь", "Северная Корона", "Секстант", "Сетка", "Скорпион",
        "Скульптор", "Столовая Гора", "Стрела", "Стрелец", "Телескоп", "Телец", "Треугольник", "Тукан", "Феникс",
        "Хамелеон", "Центавр", "Цефей", "Циркуль", "Часы", "Чаша", "Щит", "Эридан", "Южная Гидра", "Южная Корона",
        "Южная Рыба", "Южный Крест", "Южный Треугольник", "Ящерица"
         ],

        labels: ["0","1","2","3","4","5","6","7","8","9","10"],
        itemLabel: "0"

    };

    $rootScope.prefs.startDate = $rootScope.prefs.currentDate;

    $rootScope.startValue = 0;

    /*
     * Modal windows stuff
     */
    $rootScope.modals = {
        add: {},
        weekPrice: {},
        startValue: {},
        startDate: {}
    };

    $rootScope.modals.add = {
        open: function(payment) {
            var modalInstance = $modal.open({
                templateUrl: prefpath + 'app/views/modals/add.html',
                controller: 'addCtrl',
                size: 'lg',
                resolve: {
                    payment: function() {
                        return payment;
                    }
                }
            });
        }
    };

    $rootScope.modals.weekPrice = {
        open: function() {
            var modalInstance = $modal.open({
                templateUrl: prefpath + 'app/views/modals/weekPrice.client.view.html',
                controller: 'WeekPriceController'
            });

            modalInstance.result.then(function (selectedItem) {
                $rootScope.prefs.isSetWeekPrice = true;
                //$rootScope.updateTable();
            });
        }
    };

    $rootScope.modals.startValue = {
        open: function() {
            var modalInstance = $modal.open({
                templateUrl: prefpath + 'app/views/modals/startValue.client.view.html',
                controller: 'StartValueController'
            });
        }
    };

    $rootScope.modals.startDate = {
        open: function() {
            var modalInstance = $modal.open({
                templateUrl: prefpath + 'app/views/modals/startDate.client.view.html',
                controller: 'StartDateController'
            });
        }
    };

    // export data
    $rootScope.autosave = false;
    if(localStorage.hasOwnProperty('autosave')) {
        var autosaveVal = localStorage.getItem('autosave');
        $rootScope.autosave = JSON.parse(autosaveVal);
    }

    $rootScope.save_data = function(){
        if(!$rootScope.autosave) {
            return false;
        }

        var data = {
            default_weeks_num: $rootScope.default_weeks_num,
            start_date: $rootScope.prefs.startDate,
            start_value: $rootScope.prefs.startValue,
            payments: $rootScope.payments,
            view_mode: $rootScope.prefs.viewMode
        };
        localStorage.setItem('user_data', JSON.stringify(data));
        //$rootScope.addNotice('Данные сохранены в LocalStorage');
    };


    $rootScope.clearStorageData = function(){
        if(localStorage.hasOwnProperty('user_data')) {
            localStorage.removeItem('user_data');
            $rootScope.addNotice('Данные о пользовательских настройках удалены из LocalStorage');
        }
    };

    $rootScope.dataIsNotEmpty = function(){
        return $rootScope.payment.length != 0;
    };

    $rootScope.storageDataIsNotEmpty = function(){
        return localStorage.hasOwnProperty('user_data');
    };

    $rootScope.changeAutosave = function(val){
        localStorage.setItem('autosave', val);
        $rootScope.autosave = val;

        if($rootScope.autosave) {
            $rootScope.save_data();
            $rootScope.addNotice('Данные о платежах и настройках будут автоматически сохраняться в LocalStorage');
        }
    };
    // end export

    $rootScope.weeks = [];

    $rootScope.after_change_payment = function(payment){
        if(payment.sum > 0) {
            $rootScope.expenses_num--;
            $rootScope.incomes_num++;
            if(payment.regular) {
                $rootScope.regular_incomes_num++;
                $rootScope.regular_expenses_num--;
            }
            else {
                $rootScope.casual_incomes_num++;
                $rootScope.casual_expenses_num--;
            }
        }
        else {
            $rootScope.expenses_num++;
            $rootScope.incomes_num--;
            if(payment.regular) {
                $rootScope.regular_expenses_num++;
                $rootScope.regular_incomes_num--;
            }
            else {
                $rootScope.casual_expenses_num++;
                $rootScope.casual_incomes_num--;
            }
        }
    };

    $rootScope.delete_payment = function(payment){
        decrement_payments_total_values(payment);
        $rootScope.payments.splice(payment.index, 1);
        $rootScope.weeks_provider.delete_payment(payment);
        $rootScope.save_data();
    };

    $rootScope.add_payment = function(payment_data){
        var payment = new Payment(payment_data);
        increment_payments_total_values(payment);
        payment.set_index($rootScope.payments.length);
        $rootScope.payments.push(payment);
        $rootScope.weeks_provider.add_payment(payment);
    };

    function increment_payments_total_values(payment){
        var payment_sum = payment.sum,
            is_regular = payment.regular;

        if(payment_sum > 0) {

            //$rootScope.total_income += payment_sum;
            $rootScope.incomes_num++;
            if(is_regular) {
                $rootScope.regular_incomes_num++;
            }
            else {
                $rootScope.casual_incomes_num++;
            }

        }
        else {
            //$rootScope.total_expense += payment_sum;
            $rootScope.expenses_num++;
            if(is_regular) {
                $rootScope.regular_expenses_num++;
            }
            else {
                $rootScope.casual_expenses_num++;
            }
        }
    }

    function decrement_payments_total_values(payment){
        var payment_sum = payment.sum,
            is_regular = payment.regular;

        if(payment_sum > 0) {

            $rootScope.total_income -= payment_sum;
            $rootScope.incomes_num--;
            if(is_regular) {
                $rootScope.regular_incomes_num--;
            }
            else {
                $rootScope.casual_incomes_num--;
            }

        }
        else {
            $rootScope.total_expense -= payment_sum;
            $rootScope.expenses_num--;
            if(is_regular) {
                $rootScope.regular_expenses_num--;
            }
            else {
                $rootScope.casual_expenses_num--;
            }
        }
    }

    $rootScope.init_weeks = function(){
        $rootScope.weeks_provider = new WeeksProvider();
        $rootScope.weeks = $rootScope.weeks_provider.weeks;
    };

    $rootScope.rebuild_weeks = function(weeks_num){
        $rootScope.weeks = [];
        $rootScope.init_weeks();
    };

    init_years_weeks();

    function init_years_weeks(){
        if(localStorage.hasOwnProperty('user_data')) {
            var data = JSON.parse(localStorage.getItem('user_data'));
            $rootScope.default_weeks_num = data.default_weeks_num;
            $rootScope.prefs.startValue = data.start_value;
            $rootScope.prefs.startDate = new Date(data.start_date);
            $rootScope.prefs.viewMode = data.view_mode;
            $rootScope.init_weeks();
            data.payments.forEach(function(payment, payment_i){
                var payment_data = payment.payment_data;
                payment_data.date = new Date(payment_data.date);
                $rootScope.add_payment(payment_data);
            });
            return;
        }
        else {
            $rootScope.init_weeks();
        }
    }
}];
