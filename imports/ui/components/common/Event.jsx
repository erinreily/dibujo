import React from 'react';

export const Event = ({ event, onDeleteClick }) => {
    return (
        <li>
            <span>{event.text}</span>
            <button className="icon-only mt-0 mb-0 ml-16 p-8" onClick={() => onDeleteClick(event) }>
                <img alt="delete event" src="/images/icons/delete_black_24dp.svg" />
            </button>
        </li>
    );
};