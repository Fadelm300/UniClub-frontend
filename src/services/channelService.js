const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/channels/`;

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

export default {
  index,
};
