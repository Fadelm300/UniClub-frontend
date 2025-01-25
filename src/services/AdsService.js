const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/ads`;

const getAds = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) {
      throw new Error(`Error fetching ads: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
};

const getAdById = async (adId) => {
  try {
    const res = await fetch(`${BASE_URL}/${adId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    // Log the response status and data
    console.log('Response Status:', res.status);
    const data = await res.json();
    console.log('Fetched Ad Data:', data);

    if (!res.ok) {
      throw new Error(`Error fetching ad: ${res.status} ${res.statusText}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching ad:', error);
    throw error;
  }
};


const addAd = async (formData) => {
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
      throw new Error(`Error adding ad: ${res.status} ${errorData}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error adding ad:', error);
    throw error;
  }
};

const editAd = async (adId, formData) => {
  try {
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(`${BASE_URL}/${adId}`, options);
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Error editing ad: ${res.status} ${errorData}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error editing ad:', error);
    throw error;
  }
};

const deleteAd = async (adId) => {
  try {
    const res = await fetch(`${BASE_URL}/${adId}`, {
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
    console.error('Error deleting ad:', error);
    throw error;
  }
};

export default { getAds, getAdById, addAd, editAd, deleteAd };
