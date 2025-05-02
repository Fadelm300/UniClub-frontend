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

const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const json = await response.json();
    console.log("Response from server:", json);  // Log the server's response

    if (response.ok) {
      return json;  // Return user data and token if success
    } else {
      throw new Error(json.error || 'Failed to verify OTP');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw new Error('Error verifying OTP: ' + error.message);
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
    console.log(json);

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

const resetPasswordStep1 = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/resetpasswordstep1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    return json;
  } catch (err) {
    // console.log(err);
    throw err;
  }
}

const resetPasswordStep2 = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/resetpasswordstep2`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const resetPasswordStep3 = async (formData) => {try {
  const res = await fetch(`${BACKEND_URL}/users/resetpasswordstep3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const json = await res.json();

  if (json.error) {
    throw new Error(json.error);
  }

  return json;
} catch (err) {
  console.log(err);
  throw err;
}
}

const resendOtp = async (email) => {
  try {
    const response = await fetch(`${BACKEND_URL}/users/resendotp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const json = await response.json();
    if (response.ok) {
      return json.message; // Return success message
    } else {
      throw new Error(json.error || 'Failed to resend OTP');
    }
  } catch (error) {
    console.error('Error resending OTP:', error.message);
    throw error;
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

const getOtherUserProfile = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BACKEND_URL}/profiles/other/${userId}`, {
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

const toggleFollow = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BACKEND_URL}/users/follow/${userId}`, {
    method: 'PUT',
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
  getOtherUserProfile,
  updateUserProfile,
  deleteUserProfile,
  toggleFollow,
  verifyOtp,
  resendOtp,
  resetPasswordStep1,
  resetPasswordStep2,
  resetPasswordStep3
};
