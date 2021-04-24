import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const EventForm = ({ setShowEventForm, date }) => {
    const [text, setText] = useState('');
    const inputId = "addEvent" + date;

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        Meteor.call('events.insert', text, date);

        setText("");
        setShowEventForm(false);
    }

    return (
        <form className="event-form m-4 p-4" onSubmit={handleSubmit}>
            <label htmlFor={ inputId }>New event: </label>
                <input
                    id={ inputId }
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

            <button type="submit">Add Event</button>
        </form>
    )
};