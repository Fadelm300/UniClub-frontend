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

const show = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}${postId}`, {
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

export default { index, show, create, delete: deletePost };