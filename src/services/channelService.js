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



const remove = async (path) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error('Failed to delete channel');

  return res.json();
};

export default {
  index,
  create,
  remove,
  getbasechannel
};
