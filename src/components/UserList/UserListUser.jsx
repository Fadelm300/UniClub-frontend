import React from 'react';
import adminService from '../../services/adminService';
import { useEffect, useState } from 'react';
import './UserList.css'; // Import the CSS file
import authService from '../../services/authService';

function UserListUser({userUser}) {
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
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.admin ? 'Admin' : 'User'}</td>
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

export default UserListUser;
