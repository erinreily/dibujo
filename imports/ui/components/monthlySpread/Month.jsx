import React, { useState } from 'react';
import { MonthWeek } from "/imports/ui/components/monthlySpread/MonthWeek.jsx"
import { MagnifiedDay } from "/imports/ui/components/monthlySpread/MagnifiedDay.jsx"
import { monthArray } from '/imports/ui/util/commonUtils.js'

const today = new Date();

/* 
returns the calendar array populated with week objects
each week object has:
    - an array of 7 "days" (numeric dates or 'x's if the day belongs to another month) 
    - a key for the MonthWeek component
takes String month and number year
*/
const populateCalendar = (month, year) => {
    let numberOfWeeks = getNumberOfWeeks(month, year),
        numberOfDays = getNumberOfDays(month, year);
        firstDayOfMonth = getFirstDayOfMonth(month, year),
        calendar = [],
        weekObject = {
            week: [],
            key: month + "-week-0"
        },
        currentDay = 1;

    // populate first week starting with 'x's for dates in the previous month
    for (let i = 0; i < 7; i++) {
        if (i < firstDayOfMonth) {
            weekObject.week.push('x');
        } else {
            weekObject.week.push(currentDay);
            currentDay++;
        }
    }

    calendar.push(weekObject);

    // for remaining weeks, push more dates until maximum number is reached, then fill with 'x's
    for (let i = 1; i < numberOfWeeks; i++) {
        weekObject = {
            week: [],
            key: month + '-week-' + i
        };

        for (let j = 0; j < 7; j++) {
            if (currentDay > numberOfDays) {
                weekObject.week.push('x');
            } else {
                weekObject.week.push(currentDay);
                currentDay++;
            }
        }

        calendar.push(weekObject);
    }

    return calendar;
};

// takes String month and number year
// finds the first weekday of the given month/year
// returns 0-6
const getFirstDayOfMonth = (month, year) => {
    let firstDayOfMonth = new Date(year, monthArray.indexOf(month), 1);
    return firstDayOfMonth.getDay();
};

// takes String month and number year
// finds number of weeks depending on the total number of days and the first weekday of the month
// returns 4, 5, or 6
const getNumberOfWeeks = (month, year) => {
    let numberOfWeeks = 5,
        numberOfDays = getNumberOfDays(month, year),
        firstDayOfMonth = getFirstDayOfMonth(month, year);

    if ((numberOfDays === 30 && firstDayOfMonth === 6) || (numberOfDays === 31 && firstDayOfMonth >= 5)) {
        numberOfWeeks = 6;
    } else if (numberOfDays === 28 && firstDayOfMonth === 0) {
        numberOfWeeks = 4;
    }

    return numberOfWeeks;
};

// takes String month and number year
// returns a number between 28 - 31
const getNumberOfDays = (month, year) => {
    if (['April', 'June', 'September', 'November'].includes(month)) { // months with 30 days
        return 30;
    } else if (month !== 'February') { // months with 31 days
        return 31;
    } else if (year % 4 === 0 && year % 100 === 0 && year % 400 === 0) { //february + leap year
        return 29;
    }

    return 28; // february + no leap year
};

/*
This component renders the calendar on the monthly spread view
The user can move forward or back through the months with the menu
*/
export const Month = () => {
    const [month, setMonth] = useState(monthArray[today.getMonth()]);
    const [year, setYear] = useState(today.getFullYear());
    const [dialogDate, setDialogDate] = useState(today);

    // set calendar for the given month and year
    setCalendar = (month, year) => {
        return populateCalendar(month, year);
    }

    // sets the date for the magnified day dialog and opens it
    const openDialog = (date) => {
        setDialogDate(date);
        let dialog = document.getElementById('magnifiedDayDialog');
        dialog.showModal();
    };
    const closeDialog = () => {
        let dialog = document.getElementById('magnifiedDayDialog');
        dialog.close();
    };

    // invoked when tapping the left, right, or star icons with direction 'back', 'forward', or undefined
    // changes year if moving forward from December or back from January
    const updateMonthYear = (direction) => {
        if (direction === 'back') {
            if (month === 'January') {
                setMonth('December');
                setYear(year - 1);
            } else {
                setMonth(monthArray[ monthArray.indexOf(month) - 1 ]);
            }
        } else if (direction === 'forward') {
            if (month === 'December') {
                setMonth('January');
                setYear(year + 1);
            } else {
                setMonth(monthArray[ monthArray.indexOf(month) + 1 ]);
            }
        } else {
            setMonth(monthArray[today.getMonth()]);
            setYear(today.getFullYear());
        }
    };

    return (
        <div className="month-container mt-32 mb-32 mr-8 ml-8">
            <div className="month panel">
                <table>
                    <caption><h1>{ month } { year }</h1></caption>
                    <tbody>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                        { setCalendar(month, year).map(week => <MonthWeek
                            key={ week.key } 
                            daysArray={ week.week }
                            month={ month }
                            year={ year }
                            openDialog={ openDialog }
                        />) }
                    </tbody>
                </table>
                <div className="flex-container mt-8">
                    <button className="icon-only" onClick={ () => updateMonthYear('back') }><img alt="Go back one month" src="/images/icons/arrow_back_ios_black_24dp.svg" /></button>
                    <button className="icon-only" onClick={ () => updateMonthYear() }><img alt="Return to this month" src="/images/icons/star_rate_black_24dp.svg" /></button>
                    <button className="icon-only" onClick={ () => updateMonthYear('forward') }><img alt="Go forward one month" src="/images/icons/arrow_forward_ios_black_24dp.svg" /></button>
                </div>
                <MagnifiedDay
                    closeDialog={ closeDialog } 
                    date={ dialogDate }
                />
            </div>
        </div>
    )
};