import React from 'react';
import { Weekday } from "/imports/ui/components/weeklySpread/Weekday.jsx"
import { dayArray, monthArray, getOffsetDate } from '/imports/ui/util/commonUtils.js'

const today = new Date();
//const today = new Date(new Date().setDate(new Date().getDate() - 14)); // for testing

/* 
/ gets the label for the week
/ if the entire week is in one month, formats as "Month dd - dd"
/ if week lands in two months, formats as "Month dd - Month dd"
*/
const getWeekLabel = () => {
    let day1 = getOffsetDate(today, dayArray[0]),
        day7 = getOffsetDate(today, dayArray[6]),
        weekLabelLine1 = monthArray[day1.getMonth()],
        weekLabelLine2 = day7.getDate();

    if (day1.getMonth() !== day7.getMonth()) {
        weekLabelLine1 = weekLabelLine1 + ' ' + day1.getDate() + ' -';
        weekLabelLine2 = monthArray[day7.getMonth()] + ' ' + weekLabelLine2;
    } else {
        weekLabelLine2 = day1.getDate() + ' - ' + weekLabelLine2;
    }
    return weekLabelLine1 + '\n' + weekLabelLine2;
}

export const Week = () => {
    return (
        <div>
            <ul id="week" className="week-container p-0">
                <li className="weekday-block m-8 p-16">
                    <div>
                        <h1 id="week-label" className="header">{ getWeekLabel() }</h1>
                    </div>
                </li>

                { dayArray.map(weekday => <Weekday 
                key={ weekday } 
                day={ weekday }
                date={ getOffsetDate(today, weekday) }
                />) }
            </ul>
        </div>
    )
};