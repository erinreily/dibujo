import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

/*
This component renders a form to add a new task or event

Properties:
    type - "task" or "event"
    setShowForm - setShowTaskForm or setShowEventForm from the parent component, invoked with false if user cancels or submits input
    date - the date that should be associated with the new task/event, in mmddyyyy format
*/
export const TaskEventForm = ({ type, setShowForm, date }) => {
    const [text, setText] = useState('');
    const inputId = "add-" + type + "-" + date;
    const method = type + "s.insert";

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        Meteor.call(method, text, date);

        setText("");
        setShowForm(false);
    }

    return (
        <div>
            <div className="flex-container">
                <form className="task-event-form m-4 p-4 form-inline" onSubmit={ handleSubmit }>
                    <label htmlFor={ inputId }>New { type }: </label>
                    <input
                        id={ inputId }
                        type="text"
                        value={ text }
                        onChange={ (e) => setText(e.target.value) }
                    />
                    <div>
                        <button type="submit" className="icon-only mt-0 mb-4 ml-16 mr-0 p-0">
                            <img alt="Add" src="/images/icons/done_black_24dp.svg" />
                        </button>
                        <button onClick={ () => setShowForm(false) } className="icon-only mt-0 mb-4 ml-16 mr-0 p-0">
                            <img alt="Cancel" src="/images/icons/close_black_24dp.svg" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};