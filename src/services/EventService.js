const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/event`;

const getEvents = async (path) => {
  try {
    const res = await fetch(`${BASE_URL}/get${path||'/'}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) {
      throw new Error(`Error fetching events: ${res.status} ${res.statusText}`);
    }
    return await res.json();
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
    if (!res.ok) {
      throw new Error(`Error fetching event: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.log('Error fetching event:', error);
    throw error;
  }
};

const addEvent = async (formData ,path) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(`${BASE_URL}/add${path}`, options);
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Error adding event: ${res.status} ${errorData}`);
    }
    return await res.json();
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
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Error editing event: ${res.status} ${errorData}`);
    }
    return await res.json();
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

    if (!res.ok) {
      const errorData = await res.text(); 
      console.error('Server error:', errorData); 
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return true;
  } catch (error) {
    console.log('Error deleting event:', error);
    throw error; 
  }
};

export default { getEvents, addEvent, editEvent, deleteEvent, getEventById };
