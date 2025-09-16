const moment = require('moment');

function getDate() {
    console.log(moment().format('YYYY/DD/MM HH:mm:ss'));
}

getDate();

function getCurrentWeekday() {
    console.log(moment().format('dddd'));
}

getCurrentWeekday();