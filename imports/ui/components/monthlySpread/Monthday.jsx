import React, { Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { EventsCollection } from '/imports/db/EventsCollection';
import { formatDate, monthArray } from '/imports/ui/util/commonUtils.js';

// returns JavaScript date object for the given month (String), year (Number), and day (Number)
const getDate = (month, year, day) => {
    let date = new Date(year, monthArray.indexOf(month), day);
    return date;
};

/*
This component renders a single calendar day with a number and dots reflecting the number of tasks or events for that day
If the day falls outside the given month, no information will render in the calendar day spot
Renders a bookmark icon on the current day

Properties:
    date - numeric date
    month - String month
    year - numeric month
    hasValue - false if the date falls outside the month, otherwise true
    openDialog - opens the magnified day dialog, passed originally from Month
*/
export const Monthday = ({ date, month, year, hasValue, openDialog }) => {
    const today = formatDate(getDate(month, year, date)) === formatDate(new Date());

    if (hasValue) {
        const user = useTracker(() => Meteor.user());
        const userFilter = user ? { userId: user._id } : {};
        const dateFilter = { date: formatDate(getDate(month, year, date)) };
        const userDateFilter = {...userFilter, ...dateFilter};
    
        const { tasks, isLoading } = useTracker(() => {
            const noDataAvailable = { tasks: []};
            if (!Meteor.user()) {
                return noDataAvailable;
            }
            const handler = Meteor.subscribe('tasks');
        
            if (!handler.ready()) {
                return { ...noDataAvailable, isLoading: true };
            }
        
            const tasks = TasksCollection.find(
                userDateFilter, {
                sort: {createdAt: 1}
                }
            ).fetch();
        
            return { tasks };
        });

        const { events, isLoadingEvents } = useTracker(() => {
            const noEventDataAvailable = { events: []};
            if (!Meteor.user()) {
            return noEventDataAvailable;
            }
            const handler = Meteor.subscribe('events');
        
            // if (!handler.ready()) {
            //   return { ...noEventDataAvailable, isLoadingEvents: true };
            // }
        
            const events = EventsCollection.find(userDateFilter, {
                sort: {createdAt: 1}
            }
            ).fetch();
        
            return { events };
        });

        // dots that display below the date number reflecting the number of items that day has
        // stops at three, since three can be a decent indicator that there are several items for that day
        createDots = () => {
            let dots = [];
            for (let i = 0; i < events.length + tasks.length; i++) {
                dots.push(<span key={ i }>•</span>);
                if (dots.length >= 3) {
                    break;
                }
            }
            return dots;
        }
    }
    

    return (
        <Fragment>
            { hasValue ? (
                <td onClick={ () => openDialog(getDate(month, year, date)) }>
                    { today && (
                        <img alt="Today" className="bookmark-icon" src="/images/icons/bookmark_border_black_24dp.svg" />
                    )}
                    <button>
                        { date }
                        <br></br>
                        <div className="dots">{ createDots() }</div>
                    </button>
                </td>
            ) : (
                <td className="disabled"></td>
            )}
        </Fragment>
    );
};