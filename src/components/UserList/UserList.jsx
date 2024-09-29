import React from 'react'
import adminService from '../../services/adminService';
import { useEffect, useState } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await adminService.getUsers();
                setUsers(data); // Assuming data is an array

            } catch (error) {
                setError(error.message);
            }
        };

        fetchUsers();
    }, []);


  return (
    <>
    {users.map((user) => (
      <div key={user._id}>{user.username}</div>
    ))}
    </>
  )
}

export default UserList;