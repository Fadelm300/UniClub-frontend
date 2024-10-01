const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const signout = () => {
  window.localStorage.removeItem('token');
};


const getUser = () =>  {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const rawPayload = token.split('.')[1]
    const jsonPayload= window.atob(rawPayload)

    const user = JSON.parse(jsonPayload);
    return user;

  } catch (err) {
    console.log(err);
    return err;
  }

}

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    if (json.token) {

      // save it to local storage
      window.localStorage.setItem('token', json.token);

      const rawPayload = json.token.split('.')[1]
      const jsonPayload= window.atob(rawPayload)

      const user = JSON.parse(jsonPayload);
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};



const getUserProfile = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BACKEND_URL}/profiles/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error fetching user profile: ' + error.message);
  }
};

const updateUserProfile = async (userId, userData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BACKEND_URL}/profiles/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }

  return await response.json();
};

const deleteUserProfile = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BACKEND_URL}/profiles/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete user profile');
  }

  return await response.json();
};

export default {
  signup,
  signin,
  getUser,
  signout,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
};
