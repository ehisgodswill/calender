const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const monthId = document.getElementById("month");
const yearId = document.getElementById("year");
const optionsId = document.querySelector('.date-inp .options');

for (let i = 0; i < Months.length; i++) {
    optionsId.innerHTML += `<option class="option" onclick="changeMonth(${i})">${Months[i]}</option>`;
}

monthId.onclick = ()=> {
    optionsId.style.display = 'inline-block';
    // document.querySelector('.container').onclick = ()=> {optionsId.style.display = 'none'};
}


function changeMonth(value) {
    optionsId.style.display = 'none';
    document.querySelector('.container').onclick = ()=> {};
    displayDates(yearId.value, value + 1);
}

/**
 * eg*   getCalender(2016, 4);
 * Returns:[ 
 *  28 29 30 31  1  2  3
 * 	4  5  6  7  8  9 10
 * 	11 12 13 14 15 16 17
 * 	18 19 20 21 22 23 24
 * 	25 26 27 28 29 30 01
 * ]
*/
function getCalender(year, month) {
    month = parseInt(month);
    year = parseInt(year);
    const prevYear = month === 1 ? year - 1 : year;
    const prevMonth = month === 1 ? 12 : month - 1;
    const nextYear = month === 12 ? year + 1 : year;
    const nextMonth = month === 12 ? 1 : month + 1;
    const monthEndDate = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let dates = [];
    const weekStart = getWeekDay(year, month, 1);
    const dateStart = monthEndDate[prevMonth - 1] - weekStart + 1;
    const nextMonthStart = getWeekDay(nextYear, nextMonth, 1);
    const dateEnd = 7 - nextMonthStart;

    
    document.getElementById("prev-btn").onclick = ()=>displayDates(prevYear, prevMonth);
    document.getElementById("next-btn").onclick = ()=>displayDates(nextYear, nextMonth);


    for (let n = dateStart; n <= monthEndDate[prevMonth - 1]; n++) {
        dates.push(n);
    }
    for (let n = 1; n <= monthEndDate[month - 1]; n++) {
        dates.push(n);
    }
    for (let n = 1; n <= dateEnd; n++) {
        dates.push(n);
    }
    return (dates);
}
/**
 * Monday: 1 -> Sunday: 7 
*/
function getWeekDay(year, month, day) {
    const date = new Date(year, month - 1, day).getDay();
    return date === 0 ? 7 : date;
}

function isLeapYear(year) {
    return (year % 4) === 0;
}

function displayDates(year, month) {
    const days = document.getElementById('days');
    let isCurrent = false;
    const date = new Date();
    year = year?year: date.getFullYear();
    month = month? month - 1: date.getMonth();
    let today = date.getDate();
    const dates = getCalender(year, month + 1);

    days.innerHTML = '';

    for (let i = 0; i < dates.length; i++) {
        if (dates[i] === 1) {
            isCurrent = !isCurrent;
        }
        days.innerHTML += `<div class="day${isCurrent ? dates[i] === today && month === date.getMonth() && year == date.getFullYear()?" today": "" : " prev"}">${dates[i]}</div>`
    }
    monthId.innerHTML = Months[month];
    yearId.value = year;
} displayDates();