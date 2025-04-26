const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const sendContactMessage = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BACKEND_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error sending contact message: ' + error.message);
  }
};

const getCurrentUser = async (token) => {
  const response = await fetch(`${BACKEND_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to get user info');
  return await response.json();
};

const getAllMessages = async (token) => {
  const response = await fetch(`${BACKEND_URL}/contact`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch messages');
  return await response.json();
};

const deleteMessage = async (id, token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete message');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error deleting message: ' + error.message);
  }
};

export default {
  sendContactMessage,
  getCurrentUser,
  getAllMessages,
  deleteMessage
};
