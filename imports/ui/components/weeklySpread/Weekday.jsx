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
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showEventForm, setShowEventForm] = useState(false);
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

    return (
        <li className="weekday-block m-8 p-16">
            <div>
                <h2 className="header mt-0 mb-8">{ day } / { date.getDate() } { formatDate(date) === formatDate(new Date()) ? (<span>⭐</span>) : (<span></span>) }</h2>
                {/* <div className="filter">
                    <button onClick={() => setHideCompleted(!hideCompleted)}>
                    {hideCompleted ? 'Show All' : 'Hide Completed'}
                    </button>
                </div> */}

                <div class="tasks">
                    {isLoading && <div className="loading">loading...</div>}
                    
                    <div className="week-items-container mb-16">
                        <h3 className="header m-0">To Do</h3>
                        <button onClick={() => setShowTaskForm(!showTaskForm)} className="addTask icon mt-0 mb-0 ml-16 p-8">
                            <img className={ showTaskForm ? 'cancel' : 'add'} alt={ showTaskForm ? "Cancel add task" : "Add task" } src="/images/icons/close_black_24dp.svg" />
                        </button>
                        { showTaskForm ? (
                            <TaskForm setShowTaskForm={ setShowTaskForm } date={ formatDate(date) } />
                        ) : (<div></div>)}
                    </div>
                    <ul className="p-0 pl-16">
                        { tasks.map(task => <Task 
                        key={ task._id } 
                        task={ task } 
                        onCheckboxClick={ toggleChecked }
                        onDeleteClick={ deleteTask }
                        />) }
                    </ul>
                </div>
                
                <div class="events">
                    {isLoadingEvents && <div className="loading">loading...</div>}

                    <div className="week-items-container mb-16">
                        <h3 className="header m-0">Events</h3>
                        <button onClick={() => setShowEventForm(!showEventForm)} className="addEvent icon mt-0 mb-0 ml-16 p-8">
                            <img className={ showEventForm ? 'cancel' : 'add'} alt={ showEventForm ? "Cancel add task" : "Add task" } src="/images/icons/close_black_24dp.svg" />
                        </button>
                        { showEventForm ? (
                            <EventForm setShowEventForm={ setShowEventForm } date={ formatDate(date) } />
                        ) : (<div></div>)}
                    </div>

                    <ul className="p-0 pl-16">
                        { events.map(event => <Event 
                        key={ event._id } 
                        event={ event } 
                        onDeleteClick={ deleteEvent }
                        />) }
                    </ul>
                </div>
            </div>
        </li>
    );
};