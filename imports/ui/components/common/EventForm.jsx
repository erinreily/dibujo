import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const EventForm = ({ date }) => {
    const [text, setText] = useState('');
    const inputId = "addEvent" + date;

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        Meteor.call('events.insert', text, date);

        setText("");
    }

    return (
        <form className="event-form" onSubmit={handleSubmit}>
            <label htmlFor={ inputId }>Type to add a new event
                <input
                    id={ inputId }
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </label>

            <button type="submit">Add Event</button>
        </form>
    )
};