const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/posts`;
const USER_URL = `${import.meta.env.VITE_BACKEND_URL}/users`; 

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
const show = async (path, postId) => {
  try {
    const res = await fetch(`${BASE_URL}/getpost${path}/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (!res.ok) {
      throw new Error(`Error fetching post: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};


const upload = async () =>{
  const url = `${BASE_URL}/upload`
    const response = await fetch(url, { 
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }
  
    const data = await response.json(); // Parse JSON response
    return data; 
}

const create = async (formData, path) => {
  const isFormData = formData instanceof FormData; // Check if data includes a file

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  const res = await fetch(`${BASE_URL}/postpost${path}`, options);
  return res.json();
};


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

const toggleLike = async (postId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/like/${postId}`, {
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

const toggleCommentLike = async (commentId,postId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/like/${postId}/${commentId}`, {
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

const search = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.error('Error searching posts:', error);
  }
};
const reportPost = async (postId, reason) => {

  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/report/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason }), // Make sure it's properly formatted
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to report post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error reporting post:", error);
    throw error;
  }
};

const submitReport = async (postId) => {
  if (!reportReason.trim()) return alert("Please enter a reason.");

  try {
    const response = await postService.reportPost(postId, reportReason); // Just pass reportReason
    alert("Report submitted successfully");
    setReportingPost(null);
    setReportReason("");
  } catch (error) {
    console.error("Error reporting post:", error.message);
    alert(`Failed to submit report: ${error.message || "Unknown error"}`);
  }
};


const getReportedPosts = async (path) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/reported${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch reported posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reported posts:", error);
    throw error;
  }
};
const deleteReport = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/report/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error("Error deleting report:", error);
  }
};

const deleteAllReports = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/report/all/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error("Error deleting all reports:", error);
  }
};
const deletePostAreReported = async () => {
  try {
    const res = await fetch(`${BASE_URL}/reported/delete-all`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete reported posts");
    }

    return res.json();
  } catch (error) {
    console.error("Error deleting reported posts:", error);
    throw error;
  }
};




const blockUser = async (userId, duration) => {
  try {
    const response = await fetch(`${USER_URL}/blockUser`, { // Corrected API URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId, duration }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to block user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
};



export default { 
  index, 
  show, 
  create, 
  delete: deletePost, 
  getPostsByUser, 
  update: updatePost, 
  toggleLike, 
  toggleCommentLike, 
  upload, 
  reportPost, 
  getReportedPosts, 
  submitReport,
  deleteAllReports,
  deleteReport,
  blockUser, // Added blockUser function to the service
};
