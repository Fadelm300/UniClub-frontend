// src/services/creativeSpaceServices.js

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/creativespaces`;



const addCreativeSpace = async (formData) => {
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
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Error adding creative space: ${res.status} ${errorData}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error adding creative space:', error);
    throw error;
  }
};


// const getUserCreativeSpaces = async (userId) => {
//   try {
//     const res = await fetch(`${BASE_URL}/user/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     });

//     if (!res.ok) {
//       const errorData = await res.text();
//       throw new Error(`Error fetching creative spaces: ${res.status} ${errorData}`);
//     }

//     return await res.json();
//   } catch (error) {
//     console.error('Error fetching creative spaces:', error);
//     throw error;
//   }
// };
const getUserCreativeSpaces = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error fetching creative spaces: ${res.status} ${errorText}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Error fetching creative spaces:', err);
    throw err;
  }
};
const deleteCreativeSpace = async (spaceId) => {
  const res = await fetch(`${BASE_URL}/${spaceId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete creative space');
  return await res.json();
};

export default {
  addCreativeSpace,
  getUserCreativeSpaces,
  deleteCreativeSpace,
};
