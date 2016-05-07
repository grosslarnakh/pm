var TimeLine = function(start_date){
    this.default_weeks_num = 52;
    this.start_date = start_date;
    this.cur_year = start_date.getFullYear();
    this.cur_month = start_date.getMonth();
    this.day = start_date.getDate();
    this.year_val = start_date.getFullYear();
    //this.months = [];
    this.weeks = [];
    this.weeks_num = 0;
    var scope = this;
    // this.add_month = function(month){
    //     this.months.push(month);
    // };

    this.add_week = function(week){
        if(this.weeks_num > 0) {
            week.set_previous_week(this.weeks[this.weeks_num - 1]);
        }

        this.weeks.push(week);
        this.weeks_num++;
    };

    this.total_expense = 0;

    this.initWeeks = function(){
        var week_num = 1;
        while(week_num <= 52) {
            var week = new Week();
            scope.add_week(week);
            week_num++;
        }
    };

    this.lastWeek = function(){
        if(this.weeks_num == 0) {
            return null;
        }

        return this.weeks[this.weeks.length - 1];
    };

    this.addFourMoreWeeks = function(){
        var last_week = this.lastWeek();
            last_week.fix_last_day();

        var i = 0;
        while(i < 4) {
            var next_week = this.nextAfterLastWeek();
            i++;
        }
    };

    this.initWeeks();
};