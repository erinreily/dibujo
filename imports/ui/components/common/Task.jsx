import React from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
    return (
        <li>
            <input
                type="checkbox"
                checked={!!task.isChecked}
                onClick={() => onCheckboxClick(task)}
                readOnly
                aria-label={task.text}
            />
            <span>{task.text}</span>
            <button className="icon-only m-0 p-0" onClick={() => onDeleteClick(task) }>
                <img alt="delete task" src="/images/icons/delete_black_24dp.svg" />
            </button>
        </li>
    );
};