const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/posts`;


const create = async (postId, formData) => {
  try {
    const options = {
      method: 'POST',
      headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
      body: JSON.stringify(formData)
    }

    const res = await fetch(`${BASE_URL}/${postId}/comments/`, options)

    return res.json()
  }catch(e){
    console.log(e)
  }
}

export default {
  create
}