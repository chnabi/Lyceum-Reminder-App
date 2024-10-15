import React from 'react';
import './ReminderList.css';

function ReminderList({description,deadline, onDelete }) {
    return (
        <div className="reminder-list">
            <p>{deadline}: {description}</p>
            <button onClick={onDelete} className="delete-button">Delete</button>
        </div>
    );
}

export default ReminderList;