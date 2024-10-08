const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/Files`;

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

const show = async (path , FileId) => {
  try {
    const res = await fetch(`${BASE_URL}${path}/${FileId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (formData ,path) => {
  const options = {
    method: 'Post',
    headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
    body: JSON.stringify(formData)
  }
  const res = await fetch(`${BASE_URL}${path}`,options)

  return res.json()
}

const deleteFile = async (FileId, path) => {
  try {
    const res = await fetch(`${BASE_URL}${path}/${FileId}`, {
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


const updateFile = async (formData, FileId, path) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        body: JSON.stringify(formData),
      },
    };

    const res = await fetch(`${BASE_URL}/${path}/${FileId}`, options);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default { index, show, create, delete: deleteFile, updateFile };