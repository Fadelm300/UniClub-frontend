const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/comments`;


const create = async (path , postId, formData) => {
  try {
    const options = {
      method: 'POST',
      headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
      body: JSON.stringify(formData)
    }

    const res = await fetch(`${BASE_URL}${path}/${postId}`, options)

    return res.json()
  }catch(e){
    console.log(e)
  }
}

const deleteComment = async (postId, commentId) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
    }

    const res = await fetch(`${BASE_URL}/delete/${postId}/${commentId}`, options)

    return res.json()
  }catch(e){
    console.log(e)
  }
}

export default {
  create,
  deleteComment
}