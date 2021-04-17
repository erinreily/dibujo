import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const TaskForm = ({ date }) => {
    const [text, setText] = useState('');
    const inputId = "addTask" + date;

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        Meteor.call('tasks.insert', text, date);

        setText("");
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <label htmlFor={ inputId }>Type to add a new task
                <input
                    id={ inputId }
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </label>

            <button type="submit">Add Task</button>
        </form>
    )
};