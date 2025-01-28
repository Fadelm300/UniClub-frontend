import React from 'react';
import adminService from '../../services/adminService';
import { useEffect, useState } from 'react';
import { Link , useParams } from 'react-router-dom';
import './UserList.css'; 
import authService from '../../services/authService';
import channelService from '../../services/channelService';
import { deriveChannelPath } from '../../utils/helpers/urlHelpers';
function MemberList({userUser}) {
    const [users, setUsers] = useState([]);
    const [channel, setChannel] = useState({});
    const [change, setChange] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // New state for search input
    const { uni, college, major, course, event } = useParams();
    const path = deriveChannelPath({ uni, college, major, course, event });
    

    useEffect(() => {
        const fetchUsers = async (path) => {
            try {
                console.log(path);
                const channel = await channelService.getJoinedUsers(path);
                setChannel(channel);
                setUsers(channel?.members);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchUsers(path);
    }, [change]);

    const toggleAdmin = async (userId) => {
        await adminService.toggleAdmin(userId);
        setChange(!change);
    };

    const toggleFollow = async (userId) => {
        await authService.toggleFollow(userId);
        setChange(!change);
    };

    const toggleModerator = async (userId) => {
        await channelService.toggleModerator(path,userId);
        setChange(!change);
    }

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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user._id}>
                            <Link to={`/userlist/${user._id}`}>
                                    {user.username}
                            </Link>

                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.admin ? 'Admin' : 'User'}</td>
                            {userUser.id == user._id ? (
                                <>
                                    <td></td>
                                    <td></td>
                                </>
                                
                            ) : (
                                <>
                                    
                                    {userUser?.admin ? (
                                    <>
                                    <td>
                                        <button onClick={() => toggleAdmin(user._id)}>
                                            {user.admin ? 'Demote to User' : 'Promote to Admin'}
                                        </button>
                                    </td>
                                    <td>
                                    <button onClick={() => toggleModerator(user._id)}>
                                        {channel?.moderators.includes(user._id) ? 'Demote to User' : 'Promote to Moderator'}
                                    </button>
                                    </td>
                                    </>
                                    ):(
                                        channel?.moderators.includes(userUser.id) ? (
                                            <>
                                            <td>
                                                <button onClick={() => toggleModerator(user._id)}>
                                                    {channel?.moderators.includes(user._id) ? 'Demote to User' : 'Promote to Moderator'}
                                                </button>
                                                <td></td>
                                            </td>
                                            </>
                                        ):(
                                            <>
                                                <td></td>
                                                <td></td>
                                            </>
                                        )
                                    )}

                                    
                                    <td>
                                        <button onClick={() => toggleFollow(user._id)}>
                                            {user.followers.includes(userUser?.id) ? 'Unfollow' : 'Follow'}
                                        </button>
                                    </td>
                                </>
                            )}
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MemberList;
