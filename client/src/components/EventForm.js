import React, { useState } from 'react';
import axios from 'axios';

const EventForm = ({ userId }) => {
    const [eventDetails, setEventDetails] = useState({ name: '', startDateTime: '', endDateTime: '' });

    const handleChange = (e) => {
        setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post('/api/events/create-event', {
                userId,
                ...eventDetails,
                startDateTime: new Date(eventDetails.startDateTime).toISOString(),
                endDateTime: new Date(eventDetails.endDateTime).toISOString(),
            });
            alert("Event created successfully");
            // Optionally refresh events here.
        } catch (error) {
            console.error(error);
            alert("Error creating event");
        }
    };

    return (
      <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Event Name" onChange={handleChange} required />
          <input name="startDateTime" type="datetime-local" onChange={handleChange} required />
          <input name="endDateTime" type="datetime-local" onChange={handleChange} required />
          <button type="submit">Create Event</button>
      </form>
  );
};

export default EventForm;
