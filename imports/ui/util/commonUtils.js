export const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// format date in mmddyyyy
export const formatDate = (date) => {
    let month = String(date.getMonth() + 1),
        day = String(date.getDate()),
        year = String(date.getFullYear());

    if (month.length < 2) {
        month = "0" + month;
    }

    if (day.length < 2) {
        day = "0" + day;
    }

    return month + day + year;
};

// format date in Month dd
export const formatDatePretty = (date) => {
    return monthArray[date.getMonth()] + " " + date.getDate();
};

// get Date for a day of the week relative to the passed Date
export const getOffsetDateFromWeekday = (relativeDate, weekday) => {
    let offsetDate = new Date(relativeDate.getTime()),
        offset = dayArray.indexOf(weekday) - relativeDate.getDay();
    return getOffsetDate(relativeDate, offset);
}

// get new Date offset a number of days from the passed Date
export const getOffsetDate = (relativeDate, offset) => {
    let offsetDate = new Date(relativeDate.getTime());
    offsetDate.setDate(offsetDate.getDate() + offset);
    return offsetDate;
}