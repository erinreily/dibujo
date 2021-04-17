import React from 'react';

export const Event = ({ event, onDeleteClick }) => {
    return (
        <li>
            <span>{event.text}</span>
            <button onClick={() => onDeleteClick(event) }>&times;</button>
        </li>
    );
};