import React, { useEffect, useState } from 'react';
import EventService from '../../services/EventService';
import { Link } from 'react-router-dom';
import ConfirmDeleteModal from '../Events/ConfirmDelete/ConfirmDeleteModal';
import './LeftNav.css';

const LeftNav = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.getEvents();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async () => {
    if (eventIdToDelete) {
      try {
        await EventService.deleteEvent(eventIdToDelete);
        setEvents(events.filter(event => event._id !== eventIdToDelete));
        setIsModalOpen(false);
        setEventIdToDelete(null);
      } catch (error) {
        console.error('Error deleting event:', error);
        setError('Failed to delete event. Please try again.');
      }
    }
  };

  const openModal = (eventId) => {
    setEventIdToDelete(eventId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventIdToDelete(null);
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="leftNav22">
      <h1 className="events-h1-22">Upcoming Events</h1>
      <div className="event-cards22">
        {events.map((event) => (
          <div className="event-card22" key={event._id} style={{ backgroundImage: `url(${event.image})` }}>
            <div className="event-details22">
              <h2 className="event-title22">{event.title}</h2>
              <p className="event-description22">{event.description}</p>
              <div className="event-info22">
                <p className="event-date-time">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  <br />
                  <strong>Time:</strong> {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>

              {user?.admin && (
                <div className="event-actions22">
                  <Link to={`/edit-event/${event._id}`} className="edit-button22">Edit</Link>
                  <button className="delete-button22" onClick={() => openModal(event._id)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmDeleteModal 
        isOpen={isModalOpen} 
        onConfirm={handleDelete} 
        onCancel={closeModal} 
      />
    </div>
  );
};

export default LeftNav;
