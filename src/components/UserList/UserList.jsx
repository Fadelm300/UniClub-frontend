import React from 'react'
import adminService from '../../services/adminService';
import { useEffect, useState } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [change, setChange] = useState(true);

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
    }, [change]);

    const toggleAdmin = async (userId) =>{
        await adminService.toggleAdmin(userId);
        if(change){
            setChange(false);
        }else{
            setChange(true);
        }

    }


  return (
    <>
    {users.map((user) => (
        user.admin?
        <div key={user._id}> {user.username} , {user.email} , {user.phone} , admin <button onClick={()=>toggleAdmin(user._id)}>demote to user</button></div>
        :
        <div key={user._id}> {user.username} , {user.email} , {user.phone} , user <button onClick={()=>toggleAdmin(user._id)}> promote to admin</button></div>
      
    ))}
    </>
  )
}

export default UserList;