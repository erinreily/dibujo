import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { EventsCollection } from '/imports/db/EventsCollection';
import { TaskEvent } from '/imports/ui/components/common/TaskEvent.jsx';
import { TaskEventForm } from '/imports/ui/components/common/TaskEventForm.jsx';
import { formatDate } from '/imports/ui/util/commonUtils.js'
import { formatDatePretty } from '../../util/commonUtils';

const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('tasks.setIsChecked', _id, !isChecked);
};

const openDialog = (dialogId) => {
    let dialog = document.getElementById(dialogId);
    dialog.showModal();
};
const closeDialog = (dialogId) => {
    let dialog = document.getElementById(dialogId);
    dialog.close();
}

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);
const deleteEvent = ({ _id }) => Meteor.call('events.remove', _id);

export const Weekday = ({ day, date }) => {
    const taskDialogId = "dialog-task-" + formatDate(date);
    const eventDialogId = "dialog-event-" + formatDate(date);

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
                <h2 className="header mt-0 mb-8">{ day } / { date.getDate() } { formatDate(date) === formatDate(new Date()) && (<img alt="Today" src="/images/icons/star_rate_black_24dp.svg" />) }</h2>
                <hr></hr>
                <div className="tasks mb-16">
                    { isLoading && <div className="loading">loading...</div> }
                    
                    <div className="week-items-container">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-1 col-xs-1">
                                    <h3 className="header m-0">To Do</h3>
                                </div>
                                <div className="col-sm-1 col-xs-1">
                                    <button onClick={ () => openDialog(taskDialogId) } className="addTask icon icon-only mt-0 mb-0 ml-16 pt-4 pb-4 pl-0 pr-0">
                                        <img className="add" alt="Add task" src="/images/icons/add_circle_outline_black_24dp.svg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <TaskEventForm 
                            type="task" 
                            closeDialog={ closeDialog } 
                            date={ formatDate(date) } 
                            prettyDate={ formatDatePretty(date) } 
                        />
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
                                    <button onClick={ () => openDialog(eventDialogId) } className="addEvent icon icon-only mt-0 mb-0 ml-16 pt-4 pb-4 pl-0 pr-0">
                                        <img className="add" alt="Add event" src="/images/icons/add_circle_outline_black_24dp.svg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <TaskEventForm 
                            type="event" 
                            closeDialog={ closeDialog } 
                            date={ formatDate(date) } 
                            prettyDate={ formatDatePretty(date) } 
                        />
                    </div>

                    <ul className="p-0 pl-16">
                        { events.map(event => <TaskEvent 
                            key={ event._id }
                            type="event"
                            item={ event } 
                            onDeleteClick={ deleteEvent }
                        />) }
                    </ul>
                </div>
            </div>
        </li>
    );
};