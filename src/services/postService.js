const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/posts`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (path , postId) => {
  try {
    const res = await fetch(`${BASE_URL}${path}/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
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

const deletePost = async (postId, path) => {
  try {
    const res = await fetch(`${BASE_URL}/${path}/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const getPostsByUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts by user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching posts by user:', error);
    throw error;
  }
};


const updatePost = async (postId, formData, path) => {
  try {
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    
    const res = await fetch(`${BASE_URL}/${postId}`, options);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const toggleLike = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/like/${userId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed');
  }

  return await response.json();
};


export default { index, show, create, delete: deletePost, getPostsByUser, update: updatePost , toggleLike};
