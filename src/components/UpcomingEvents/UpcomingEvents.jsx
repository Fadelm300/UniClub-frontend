import React from 'react';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
    // fake data 
  const events = [
    {
      title: "Event Title 1",
      description: "This is the description of the first event. It contains information about the event details.",
      date: "October 5, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Auditorium A",
      logo: "photo-1462630.jpeg"  // Replace with actual logo path
    },
    {
      title: "Event Title 2",
      description: "This is the description of the second event. It contains information about the event details.",
      date: "October 10, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Conference Hall B",
      logo: "./109799b.jpg"
    },
    {
      title: "Event Title 3",
      description: "This is the description of the third event. It contains information about the event details.",
      date: "October 15, 2024",
      time: "9:00 AM - 11:00 AM",
      location: "Room 301",
      logo: "./gettyimages.jpg"
    }
  ];

  return (
    <div className="events-container">
      <h1 className="events-h1">Upcoming Events</h1>
      <div className="event-cards">
        {events.map((event, index) => (
          <div className="event-card" key={index} style={{ backgroundImage: `url(${event.logo})` }}>
            <div className="event-details">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>
              <div className="event-info">
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
