import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { EventsCollection } from '/imports/db/EventsCollection';
import { TaskEvent } from '/imports/ui/components/common/TaskEvent.jsx';
import { TaskEventForm } from '/imports/ui/components/common/TaskEventForm.jsx';
import { formatDate } from '/imports/ui/util/commonUtils.js';

const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('tasks.setIsChecked', _id, !isChecked);
};

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);
const deleteEvent = ({ _id }) => Meteor.call('events.remove', _id);

/*
This component renders a panel for the given date with tasks and events
Also allows user to create new tasks and events

Properties:
    weekday - the day of the week (String)
    date - JavaScript date for the weekday
*/
export const Weekday = ({ weekday, date }) => {
    const user = useTracker(() => Meteor.user());
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showEventForm, setShowEventForm] = useState(false);
    const userFilter = user ? { userId: user._id } : {};
    const dateFilter = { date: formatDate(date) };
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

    return (
        <li className="weekday-block m-8 p-16">
            <div>
                <h2 className="header mt-0 mb-16 pb-8">{ weekday } / { date.getDate() } { formatDate(date) === formatDate(new Date()) && (<img alt="Today" className="week-bookmark" src="/images/icons/bookmark_border_black_24dp.svg" />) }</h2>
                <div className="tasks mb-16">
                    { isLoading && <div className="loading">loading...</div> }
                    
                    <div className="week-items-container">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-1 col-xs-1">
                                    <h3 className="header m-0">To Do</h3>
                                </div>
                                <div className="col-sm-1 col-xs-1">
                                    <button onClick={ () => setShowTaskForm(true) } className="addTask icon icon-only mt-0 mb-0 ml-16 pt-4 pb-4 pl-0 pr-0">
                                        <img className="add" alt="Add task" src="/images/icons/add_circle_outline_black_24dp.svg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="p-0 pl-16">
                        { tasks.map(task => <TaskEvent 
                            key={ task._id }
                            type="task"
                            item={ task } 
                            onCheckboxClick={ toggleChecked }
                            onDeleteClick={ deleteTask }
                        />) }
                    </ul>
                    { showTaskForm && ( <TaskEventForm
                        type="task"
                        setShowForm={ setShowTaskForm }
                        date={ formatDate(date) }
                    />)}
                </div>
                
                <div className="events mb-16">
                    {isLoadingEvents && <div className="loading">loading...</div>}

                    <div className="week-items-container">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-1 col-xs-1">
                                    <h3 className="header m-0">Events</h3>
                                </div>
                                <div className="col-sm-1 col-xs-1">
                                    <button onClick={ () => setShowEventForm(true) } className="addEvent icon icon-only mt-0 mb-0 ml-16 pt-4 pb-4 pl-0 pr-0">
                                        <img className="add" alt="Add event" src="/images/icons/add_circle_outline_black_24dp.svg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="p-0 pl-16">
                        { events.map(event => <TaskEvent 
                            key={ event._id }
                            type="event"
                            item={ event } 
                            onDeleteClick={ deleteEvent }
                        />) }
                    </ul>
                    { showEventForm && ( <TaskEventForm
                        type="event"
                        setShowForm={ setShowEventForm }
                        date={ formatDate(date) }
                    />)}
                </div>
            </div>
        </li>
    );
};