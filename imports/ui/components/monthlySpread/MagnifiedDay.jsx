import React from 'react';
import { Link } from "react-router-dom";
import { formatDate } from '../../util/commonUtils';
import { Weekday } from '/imports/ui/components/weeklySpread/Weekday.jsx';
import { dayArray } from '/imports/ui/util/commonUtils.js'

/*
This component renders a dialog containing the Weekday component and a link to the associated weekly spread
Opens when a day on the calendar is tapped or clicked
Tapping the weekly spread link will move the user to the Week component for the week associated with that day

Properties:
    closeDialog - closes the dialog
    date - JavaScript date object associated with the selected day
*/
export const MagnifiedDay = ({ closeDialog, date}) => {
    return (
        <dialog id="magnifiedDayDialog">
            <div>
                <div className="container">
                    <button onClick={ () => closeDialog() } className="cancel-button icon-only mt-0 mb-4 ml-16 mr-0 p-0">
                        <img alt="Cancel" src="/images/icons/close_black_24dp.svg" />
                    </button>
                </div>
                <div className="week-container">
                    <Weekday 
                        key={ formatDate(date) } 
                        weekday={ dayArray[date.getDay()] }
                        date={ date }
                    />
                </div>
                <Link to={{
                    pathname: "/weeklyspread",
                    state: { relativeDate: date }
                }}>
                    <div className="button-style p-4 pl-16 mr-0 mt-8 mb-8">Go to weekly spread</div>
                </Link>
            </div>
        </dialog>
    )
};