import React, { useState } from 'react';
import { Weekday } from "/imports/ui/components/weeklySpread/Weekday.jsx"
import { dayArray, monthArray, getOffsetDateFromWeekday, getOffsetDate } from '/imports/ui/util/commonUtils.js'

const today = new Date();

/* 
/ gets the label for the week
/ if the entire week is in one month, formats as "Month dd - dd"
/ if week lands in two months, formats as "Month dd - Month dd"
*/
const getWeekLabel = (relativeDate) => {
    let day1 = getOffsetDateFromWeekday(relativeDate, dayArray[0]),
        day7 = getOffsetDateFromWeekday(relativeDate, dayArray[6]),
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

/*
This component renders the weekly spread view including a header panel and seven day panels
The user can move forward or back through the weeks with the menu

Properties:
    location - sent with state.relativeDate if user taps to go to the weekly spread for a day in the monthly spread
*/
export const Week = ({ location }) => {
    const [relativeDate, setRelativeDate] = useState(location && location.state ? location.state.relativeDate : today);

    return (
        <div>
            <ul id="week" className="week-container p-0">
                <li className="weekday-block m-8 p-16">
                    <div>
                        <h1 id="week-label" className="header mb-16">{ getWeekLabel(relativeDate) }</h1>
                        <div className="flex-container week-menu pt-8">
                            <button className="icon-only" onClick={ () => setRelativeDate(getOffsetDate(relativeDate, -7)) }><img alt="Go back one week" src="/images/icons/arrow_back_ios_black_24dp.svg" /></button>
                            <button className="icon-only" onClick={ () => setRelativeDate(today) }><img alt="Return to this week" src="/images/icons/star_rate_black_24dp.svg" /></button>
                            <button className="icon-only" onClick={ () => setRelativeDate(getOffsetDate(relativeDate, 7)) }><img alt="Go forward one week" src="/images/icons/arrow_forward_ios_black_24dp.svg" /></button>
                        </div>
                    </div>
                </li>

                { dayArray.map(weekday => <Weekday 
                    key={ weekday } 
                    weekday={ weekday }
                    date={ getOffsetDateFromWeekday(relativeDate, weekday) }
                />) }
            </ul>
        </div>
    )
};