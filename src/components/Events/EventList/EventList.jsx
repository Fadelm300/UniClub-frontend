import React from 'react';
import EventService from '../services/EventService';

const EventList = ({ events, onDelete }) => {
  const handleDelete = async (eventId) => {
    try {
      await EventService.deleteEvent(eventId);
      onDelete(eventId);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  console.log(events);

  return (
    <div>
      {events[0].map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <button onClick={() => handleDelete(event._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EventList;
