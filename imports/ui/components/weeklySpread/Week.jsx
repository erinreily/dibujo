import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Weekday } from "/imports/ui/components/weeklySpread/Weekday.jsx"
import { dayArray, monthArray, getOffsetDate } from '/imports/ui/util/commonUtils.js'

const today = new Date();
//const today = new Date(new Date().setDate(new Date().getDate() - 7)); // for testing

const getWeekLabel = () => {
    let day1 = getOffsetDate(today, dayArray[0]),
        day7 = getOffsetDate(today, dayArray[6]),
        weekLabel = monthArray[day1.getMonth()] + ' ' + day1.getDate() + ' - ';

    if (day1.getMonth() !== day7.getMonth()) {
        weekLabel += monthArray[day7.getMonth()] + ' ' + day7.getDate();
    } else {
        weekLabel += day7.getDate();
    }
    return weekLabel;
}

export const Week = () => {
    return (
        <div id="week">
            <ul className="week">
                <li>
                    <div className="weekday-block">{ <h2>{ getWeekLabel() }</h2>}</div>
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