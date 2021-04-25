import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

// type is "task" or "event"
// setShowForm is sent as setShowTaskForm or setShowEventForm
// date is mmddyyyy format
// prettyDate is Month dd format
export const TaskEventForm = ({ type, closeDialog, date, prettyDate }) => {
    const [text, setText] = useState('');
    const inputId = "add-" + type + "-" + date;
    const dialogId = "dialog-" + type + "-" + date;
    const method = type + "s.insert";

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        Meteor.call(method, text, date);

        setText("");
        closeDialog(dialogId);
    }

    return (
        <dialog id={ dialogId }>
            <div>
                <button onClick={ () => closeDialog(dialogId) } className="cancel-button mt-0 mb-4 ml-16 p-8">Cancel</button>
                <form className="task-event-form m-4 p-4" onSubmit={ handleSubmit }>
                    <label htmlFor={ inputId }>New { type } for { prettyDate }: </label>
                    <input
                        id={ inputId }
                        type="text"
                        value={ text }
                        onChange={ (e) => setText(e.target.value) }
                    />
                    <button type="submit">Add { type }</button>
                </form>
            </div>
        </dialog>
    )
};