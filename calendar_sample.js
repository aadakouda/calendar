const en_weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// 今日
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var weekday = today.getDay();
var date = today.getDate();

var options = {
    day: 'numeric',
    month: 'short'
};

var todayFomat = String(Intl.DateTimeFormat('en-US', options).format(today));

var weekday = '';
for(var i in en_weekday) {
    weekday += '<div id="weekday" class="weekday">';
    weekday += en_weekday[i];
    weekday += '</div>';
}

// 初期表示
getMonth(year, month);
document.getElementById('previousMonth').innerHTML
    = '<button onclick="getPreMonth();">&lt;</input>';
document.getElementById('today').innerHTML
    = '<button onclick="getMonth(today.getFullYear(), today.getMonth() + 1)">'+ todayFomat + '</button>';
document.getElementById('nextMonth').innerHTML
    = '<button onclick="getNextMonth();">&gt;</input>';
document.getElementById('weekdays').innerHTML = weekday;


function getMonth(year, month) {
    // 月初
    var startdate = new Date(year, month - 1, 1);
    // 月末
    var enddate = new Date(year, month, 0);
    // 月初(曜日)
    var startWeekday = startdate.getDay();
    // 先月
    var preEndDate = new Date(year, month - 1, 0);
    // 次月
    var nextDate = new Date(year, month + 1, 1);
    // 今月の日数
    var numCalDay = enddate.getDate();
    var cntDay = 0;
    
    var calendar = '';
    for(var week = 0; week < 6; week++) {
        calendar += '<div id="week" class="week">';
        for(var day = 0; day < 7; day++) {
            calendar += '<div id="date" class="date"><button onclick='
            if(week == 0 && day < startWeekday){
                // 1周目の空きマス
                calendar += '"getPreMonth()" class="preMonthDate">';
                calendar += preEndDate.getDate() - (startWeekday - 1) + day;
            } else if(cntDay >= numCalDay) {
                // 月末日以降の空きマス
                cntDay++;
                calendar += '"getNextMonth()" class="nextMonthDate">';
                calendar += (cntDay - numCalDay);
            } else {
                // 今月マス
                cntDay++;
                calendar += '"#">';
                calendar += cntDay;
            }
            calendar += '</button></div>';
        }
        calendar += '</div>';
    }
    
    document.getElementById('days').innerHTML = calendar
    document.getElementById('presentMonth').innerHTML
        = String(Intl.DateTimeFormat('en-US', {month: 'long'}).format(startdate));
}

function getPreMonth() {
    if(month == 0) {
        year--;
        month = 11;
    } else {
        month--;
    }
    getMonth(year, month);
}

function getNextMonth() {
    if(month == 11) {
        year++;
        month = 1;
    } else {
        month++;
    }
    getMonth(year, month);
}