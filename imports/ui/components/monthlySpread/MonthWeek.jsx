import React from 'react';
import { Monthday } from "/imports/ui/components/monthlySpread/Monthday.jsx"

/*
This component renders a single row on the calendar

Properties:
    daysArray - one week in the calendar array from Month
    month - String month
    year - numeric month
    openDialog - opens the magnified day dialog, passed originally from Month
*/
export const MonthWeek = ({ daysArray, month, year, openDialog }) => {
    return (
        <tr>
            { daysArray.map(weekdate => <Monthday
                key={ weekdate !== 'x' ? weekdate : Math.random()}
                date={ weekdate }
                month={ month }
                year={ year }
                hasValue={ weekdate !== 'x' }
                openDialog={ openDialog }
            />) }
        </tr>
    )
};