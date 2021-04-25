import React, { Fragment } from 'react';

// type is "task" or "event"
// item is the task or event from the database
// onCheckboxClick updates the isChecked property in the database (not needed for event type)
// onDeleteClick deletes the item from the database
// the item's id is used to create unique ids for input tags
export const TaskEvent = ({ type, item, onCheckboxClick, onDeleteClick }) => {
    const deleteText = "delete " + type;

    return (
        <li>
            { type === "task" ?
                <Fragment>
                    <input
                        id={ item._id }
                        type="checkbox"
                        checked={ !!item.isChecked }
                        onClick={ () => onCheckboxClick(item) }
                        readOnly
                    />
                    <label htmlFor={ item._id }>{ item.text }</label>
                </Fragment>
            :
                <span>{item.text}</span>
            }

            <button className="icon-only mt-0 mb-0 ml-16 p-8" onClick={ () => onDeleteClick(item) }>
                <img alt={ deleteText } src="/images/icons/delete_black_24dp.svg" />
            </button>
        </li>
    );
};