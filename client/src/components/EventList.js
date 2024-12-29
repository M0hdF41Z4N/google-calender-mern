import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = ({ userId }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
      const fetchEvents = async () => {
          try {
              const response = await axios.get(`/api/events/get-events/${userId}`);
              setEvents(response.data);
          } catch (error) {
              console.error(error);
          }
      };
      fetchEvents();
  }, [userId]);

  return (
      <table>
          <thead>
              <tr>
                  <th>Event Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
              </tr>
          </thead>
          <tbody>
              {events.map(event => (
                  <tr key={event._id}>
                      <td>{event.eventName}</td>
                      <td>{new Date(event.startDateTime).toLocaleString()}</td>
                      <td>{new Date(event.endDateTime).toLocaleString()}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  );
};

export default EventList;
