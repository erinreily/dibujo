import React, { Fragment } from 'react';

/*
This component renders either a checkbox (task) or static text (event) with a delete button
The task or event id is used to create unique ids for input tags

Properties:
    type - "task" or "event"
    item - the task or event from the database
    onCheckboxClick - updates the isChecked property in the database (not needed for event type)
    onDeleteClick - deletes the item from the database
*/
export const TaskEvent = ({ type, item, onCheckboxClick, onDeleteClick }) => {
    const deleteText = "delete " + type;

    return (
        <li className="form-inline">
            { type === "task" ?
                <Fragment>
                    <form className="form-inline">
                        <input className="checkbox"
                            id={ item._id }
                            type="checkbox"
                            checked={ !!item.isChecked }
                            onClick={ () => onCheckboxClick(item) }
                            readOnly
                        />
                        <label className="ml-8" htmlFor={ item._id }>{ item.text }</label>
                    </form>
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