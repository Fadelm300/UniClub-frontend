import React from 'react';
import adminService from '../../services/adminService';
import { useEffect, useState } from 'react';
import './UserList.css'; // Import the CSS file

function UserList() {
    const [users, setUsers] = useState([]);
    const [change, setChange] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await adminService.getUsers();
                setUsers(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUsers();
    }, [change]);

    const toggleAdmin = async (userId) => {
        await adminService.toggleAdmin(userId);
        setChange(!change);
    }

    return (
        <div className="user-list-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.admin ? 'Admin' : 'User'}</td>
                            <td>
                                <button onClick={() => toggleAdmin(user._id)}>
                                    {user.admin ? 'Demote to User' : 'Promote to Admin'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
