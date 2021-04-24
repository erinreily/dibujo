import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const TaskForm = ({ setShowTaskForm, date }) => {
    const [text, setText] = useState('');
    const inputId = "addTask" + date;

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        Meteor.call('tasks.insert', text, date);

        setText("");
        setShowTaskForm(false);
    }

    return (
        <div class="modal">
            <span class="close">&times;</span>
            <form className="task-form m-4 p-4" onSubmit={handleSubmit}>
                <label htmlFor={ inputId }>New task: </label>
                <input
                    id={ inputId }
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                
                <button type="submit">Add task</button>
            </form>
        </div>
    )
};