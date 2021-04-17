import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { TaskForm } from '/imports/ui/components/common/TaskForm.jsx';
import { Task } from '/imports/ui/components/common/Task.jsx';
import { EventsCollection } from '/imports/db/EventsCollection';
import { EventForm } from '/imports/ui/components/common/EventForm.jsx';
import { Event } from '/imports/ui/components/common/Event.jsx';
import { formatDate } from '/imports/ui/util/commonUtils.js'

const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('tasks.setIsChecked', _id, !isChecked);
}

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);
const deleteEvent = ({ _id }) => Meteor.call('events.remove', _id);


export const Weekday = ({ day, date }) => {
    const user = useTracker(() => Meteor.user());
    const [hideCompleted, setHideCompleted] = useState(false);
    const hideCompletedFilter = { isChecked: { $ne: true } };
    const userFilter = user ? { userId: user._id } : {};
    const dateFilter = { date: formatDate(date) };
    const userDateFilter = {...userFilter, ...dateFilter};
    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter, ...dateFilter };
  
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
        hideCompleted ? pendingOnlyFilter : userDateFilter, {
          sort: {createdAt: -1}
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
            sort: {createdAt: -1}
          }
        ).fetch();
    
        return { events };
      });

    return (
        <li>
            <div className="weekday-block">
                <h2 className="header">{ day } { date.getDate() } { formatDate(date) === formatDate(new Date()) ? (<span>⭐</span>) : (<span></span>) }</h2>
                <TaskForm date={ formatDate(date) } />
                <div className="filter">
                    <button onClick={() => setHideCompleted(!hideCompleted)}>
                    {hideCompleted ? 'Show All' : 'Hide Completed'}
                    </button>
                </div>

                {isLoading && <div className="loading">loading...</div>}
                
                <ul className="tasks">
                    { tasks.map(task => <Task 
                    key={ task._id } 
                    task={ task } 
                    onCheckboxClick={ toggleChecked }
                    onDeleteClick={ deleteTask }
                    />) }
                </ul>

                <EventForm date={ formatDate(date) } />
                {isLoadingEvents && <div className="loading">loading...</div>}
                
                <ul className="events">
                    { events.map(event => <Event 
                    key={ event._id } 
                    event={ event } 
                    onDeleteClick={ deleteEvent }
                    />) }
                </ul>
            </div>
        </li>
    );
};