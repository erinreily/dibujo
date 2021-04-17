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

// get Date for a day of the week relative to the passed Date
export const getOffsetDate = (relativeDate, weekday) => {
    return new Date(new Date().setDate(relativeDate.getDate() - relativeDate.getDay() + dayArray.indexOf(weekday)));
}