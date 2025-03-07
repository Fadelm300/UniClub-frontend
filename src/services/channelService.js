const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/channels`;
const basebase = `${import.meta.env.VITE_BACKEND_URL}`;

const index = async (path) => {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error('Failed to fetch channels');

    return res.json();
  } catch (error) {
    console.error('Error fetching channels:', error);
    throw error;
  }
};

const getbasechannel = async (path) => {
  try {
    const res = await fetch(`${basebase}/base`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) throw new Error('Failed to fetch channels');

    return res.json();
  } catch (error) {
    console.error('Error fetching channels:', error);
    throw error;
  }
};

const create = async (formData ,path) => {
  const options = {
    method: 'POST',
    headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
    body: JSON.stringify(formData)
  }
  const res = await fetch(`${BASE_URL}${path}`,options)

  return res.json()
}

const deleteChannel = async (path) => {
  try {
    const res = await fetch(`${BASE_URL}/${path}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) throw new Error('Failed to delete channel');
    return res.json();
  } catch (error) {
    console.error('Error deleting channel:', error);
    throw error;
  }
};



const toggleMembership = async (userId, channelId) => {
  if (!userId || !channelId) {
    throw new Error('Channel ID or User ID is missing.');
  }

  try {
    const res = await fetch(`${basebase}/users/togglechannel/${userId}/${channelId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) throw new Error('Failed to toggle channel membership');
    return res.json();
  } catch (error) {
    console.error('Error toggling channel membership:', error);
    throw error;
  }
};

const getJoinedUsers = async (path) => {
  try {
    const res = await fetch(`${basebase}/users/members${path}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      
    });

    if (!res.ok) throw new Error('Failed to fetch joined channels');
    return res.json();
  } catch (error) {
    console.error('Error fetching joined channels:', error);
    throw error;
  }
};

const toggleModerator = async (path,userId) => {
  if (!userId) {
    throw new Error('User is missing.');
  }

  try {
    const res = await fetch(`${basebase}/users/togglemoderator${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'userId': userId}),
    });
    if (!res.ok) throw new Error('Failed to toggle moderator');
    return res.json();
  } catch (error) {
    console.error('Error toggling moderator:', error);
    throw error;
  }
};


const deleteSubchannel = async (subchannelId) => {
  try {
    const res = await fetch(`${BASE_URL}/subchannel/${subchannelId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete subchannel");

    return res.json();
  } catch (error) {
    console.error("Error deleting subchannel:", error);
    throw error;
  }
};


export default {
  index,
  create,
  deleteChannel,
  getbasechannel,
  toggleMembership,
  getJoinedUsers,
  toggleModerator,
  deleteSubchannel
};
