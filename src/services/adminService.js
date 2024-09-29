const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to users profile');
      }
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  };

  const toggleAdmin = async (userid) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/admin/toggle/${userid}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle admin profile');
      }
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  };

  export default {
        getUsers , toggleAdmin
  };