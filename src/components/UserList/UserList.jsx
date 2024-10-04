import React from 'react';
import adminService from '../../services/adminService';
import { useEffect, useState } from 'react';
import './UserList.css'; 
import authService from '../../services/authService';

function UserList({userUser}) {
    const [users, setUsers] = useState([]);
    const [change, setChange] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // New state for search input

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
    };

    const toggleFollow = async (userId) => {
        await authService.toggleFollow(userId);
        setChange(!change);
    };

    // Filter the users based on the search query
    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery)
    );

    return (
        <div className="user-list-container">
            <div className="search-container">
                <i className="fa fa-search search-icon"></i> {/* Search icon */}
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by username, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                />
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
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
                            <td>
                                <button onClick={() => toggleFollow(user._id)}>
                                    {user.followers.includes(userUser.id) ? 'unfollow' : 'Follow'}
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
