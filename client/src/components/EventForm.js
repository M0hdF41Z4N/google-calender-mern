import React, { useState } from 'react';
import axios from 'axios';
import { CREATE_EVENT_URL } from '../constants/urls.js';

const EventForm = ({ userId , setIsModalOpen }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [eventName, setEventName] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === 'name') {
            setEventName(value);
        } else if (name === 'startDateTime') {
            setStartDateTime(value);
        } else if (name === 'endDateTime') {
            setEndDateTime(value);
        }


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setIsLoading(true); 
            await axios.post(CREATE_EVENT_URL, {
                userId,
                eventName:eventName,
                startDateTime:new Date(startDateTime).toISOString(),
                endDateTime:new Date(endDateTime).toISOString()
            });
            alert("Event created successfully");
            // Optionally refresh events here.
            setEventName('');
            setStartDateTime('');
            setEndDateTime('');
            setIsLoading(false);
            setIsModalOpen(false);
        } catch (error) {
            setIsLoading(false);
            alert("Error creating event");
        }
    };

    return (
        
    <form onSubmit={handleSubmit} className="event-form">
    <div className="form-group">
        <input 
            name="name" 
            placeholder="Event Name" 
            onChange={handleChange} 
            required 
            className="form-input" 
        />
    </div>
    <div className="form-group">
        <input 
            name="startDateTime" 
            type="datetime-local" 
            onChange={handleChange} 
            required 
            className="form-input" 
        />
    </div>
    <div className="form-group">
        <input 
            name="endDateTime" 
            type="datetime-local" 
            onChange={handleChange} 
            required 
            className="form-input" 
        />
    </div>
    <button type="submit" className="submit-button">Create Event</button>
</form>

  );
};

export default EventForm;
