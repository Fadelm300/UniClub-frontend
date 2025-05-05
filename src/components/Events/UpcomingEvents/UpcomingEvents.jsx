import React, { useEffect, useState } from 'react';
import EventService from '../../../services/EventService';
import { Link } from 'react-router-dom';
import ConfirmDeleteModal from '../ConfirmDelete/ConfirmDeleteModal';
import './UpcomingEvents.css';

const UpcomingEvents = ({ user }) => {
  const [futureEvents, setFutureEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.getEvents();
        setFutureEvents(data[0]);
        setPastEvents(data[1]);

      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async () => {
    if (eventIdToDelete) {
      try {
        await EventService.deleteEvent(eventIdToDelete);
        setFutureEvents(futureEvents.filter(event => event._id !== eventIdToDelete));
        setPastEvents(pastEvents.filter(event => event._id !== eventIdToDelete));
        setIsModalOpen(false);
        setEventIdToDelete(null);
      } catch (error) {
        console.error('Error deleting event:', error);
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

  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`card-${index}`);
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`card-${index}`);
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div className="events-container">
      <h1 className="events-h1">Upcoming Events</h1>
      <div className="event-cards">
        {futureEvents.map((event, index) => (
          <div
            id={`card-${index}`}
            key={event._id}
            className="event-card"
            style={{ backgroundImage: `url(${event.image})` }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="event-details">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>
              <div className="event-info">
                <p className="event-date-time_main">
                  <strong>Date:</strong>{' '}
                  {new Date(event.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  <br />
                  <strong>Time:</strong>{' '}
                  {event.time}
                  
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              </div>

              {user?.admin && (
                <div className="event-actions">
                  <Link to={`/edit-event/${event._id}`} className="edit-button">Edit</Link>
                  <button className="delete-button" onClick={() => openModal(event._id)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <h1 className="events-h1">Past Events</h1>
      <div className="event-cards"></div>
      <div className="event-cards">
        {pastEvents.map((event, index) => (
          <div
            id={`card-${index}`}
            key={event._id}
            className="event-card"
            style={{ backgroundImage: `url(${event.image})` }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="event-details">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>
              <div className="event-info">
                <p className="event-date-time_main">
                  <strong>Date:</strong>{' '}
                  {new Date(event.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  <br />
                  <strong>Time:</strong>{event.time}
                  
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              </div>

              {user?.admin && (
                <div className="event-actions">
                  <Link to={`/edit-event/${event._id}`} className="edit-button">Edit</Link>
                  <button className="delete-button" onClick={() => openModal(event._id)}>Delete</button>
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

export default UpcomingEvents;
