const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/event`;

const getEvents = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log('Error fetching events:', error);
    throw error;
  }
};

const getEventById = async (eventId) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log('Error fetching events:', error);
    throw error;
  }
};

const addEvent = async (formData) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(BASE_URL, options);
    return res.json();
  } catch (error) {
    console.log('Error adding event:', error);
    throw error;
  }
};

const editEvent = async (eventId, formData) => {
  try {
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(`${BASE_URL}/${eventId}`, options);
    return res.json();
  } catch (error) {
    console.log('Error editing event:', error);
    throw error;
  }
};

const deleteEvent = async (eventId) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return res.json();
  } catch (error) {
    console.log('Error deleting event:', error);
    throw error;
  }
};

export default { getEvents, addEvent, editEvent, deleteEvent , getEventById };
