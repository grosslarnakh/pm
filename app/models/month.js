var month_names = [
	{base: 'Январь', genitive: 'Января'},
	{base: 'Февраль', genitive: 'Февраля'},
	{base: 'Март', genitive: 'Марта'},
	{base: 'Апрель', genitive: 'Апреля'},
	{base: 'Май', genitive: 'Мая'},
	{base: 'Июнь', genitive: 'Июня'},
	{base: 'Июль', genitive: 'Июля'},
	{base: 'Август', genitive: 'Августа'},
	{base: 'Сентябрь', genitive: 'Сентября'},
	{base: 'Октябрь', genitive: 'Октября'},
	{base: 'Ноябрь', genitive: 'Ноября'},
	{base: 'Декабрь', genitive: 'Декабря'},
];

var Month = function(chosen_date, date){
	this.year = chosen_date.getFullYear(),
	this.month_name = month_names[date.getMonth()],
    this.month_number = date.getMonth(),
    this.weeks_num = 0,
    //this.next_month_date = new Date(date.getFullYear(), this.month_number, 1),
    this.days_in_month = new Date(this.year, this.month_number + 1, 0).getDate(),
    this.weeks = [],
    this.total_incomes = 0,
    this.total_expense = 0;

    this.add_week = function(week){
    	week.first_day = week.days[0].date;
    	week.last_day = week.days[week.days.length - 1].date;
        this.weeks.push(week);
        this.weeks_num++;
    };

    var days = [];
    var weeks = [];
    week_num = 0;
    this.initWeeks = function(){
    	var day_date = date.getDate();
    	var week = new Week();
    	while(day_date <= this.days_in_month) {
    		var date_for_day = new Date(this.year, this.month_number, day_date);
    		var day = new Day(date_for_day);
    		week.add_day(day);
    		if(date_for_day.getDay() == 0 || day_date == this.days_in_month) {
    			this.add_week(week);
    			week = new Week();
    		}
    		day_date++;
    	}
    };

    this.initWeeks();
};