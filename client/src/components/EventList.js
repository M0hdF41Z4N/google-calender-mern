import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_EVENTS_URL } from '../constants/urls.js';

const EventList = ({ userId }) => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const fetchEvents = async () => {
          try {
            setIsLoading(true); 
              const response = await axios.get(`${GET_EVENTS_URL}/${userId}`);
              setEvents(response.data);
              setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
              console.error(error);
          }
      };
      fetchEvents();
  }, [userId]);

  return (
    <div className="event-list">
      <table id="events-table">
          <thead>
          {isLoading ? 
         ( <>
          <tr><td colSpan={3}><div className="skeleton"></div></td></tr> 
          </>)
          :
             ( <>
              <tr>
                  <th>Event Name</th>
                  <th>Start Time</th>
                  <th>End Time</th>
              </tr>
              </>)
            }
          </thead>
          <tbody>
          {isLoading ?
           <>
           {[...Array(5)].map((_, index) => (
               <tr key={index}>
                   <td colSpan={9}><div className="skeleton"></div></td>
               </tr>
           ))}
       </> : (
        <>
              {events.map(event => (
                  <tr key={event._id}>
                      <td>{event.summary || "Event Summary" } </td>
                      <td>{new Date(event.end.dateTime).toString()}</td>
                      <td>{new Date(event.start.dateTime).toString()}</td>
                  </tr>
              ))}
              </>
            )}
          </tbody>
      </table>
       </div>
  );
};

export default EventList;
