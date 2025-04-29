import React from 'react';
import adminService from '../../services/adminService';
import { useEffect, useState } from 'react';
import './UserList.css'; 
import authService from '../../services/authService';
import { isRouteErrorResponse, Link } from 'react-router-dom';

function UserListUser({userUser}) {
    const [users, setUsers] = useState([]);
    const [follow, setFollow] = useState([]);
  
    const [searchQuery, setSearchQuery] = useState(''); 

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
    },[]);

    
    const filteredUsers = users.filter(
        (user) =>
          (user.username?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
          (user.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
          (user.phone || "").includes(searchQuery)
      );
    
    const toggleFollow = async (userId) => {

          if (follow.includes(userId)) {
            setFollow(follow.filter(id => id !== userId));
          } else {
            setFollow([...follow, userId]);
          }
        authService.toggleFollow(userId);
        
    };
    let followed = false;
    let newFollow = false;
    return (
        <div className="user-list-container">
            <div className="search-container">
                <i className="fa fa-search search-icon"></i> 
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by username, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th className='followers-nu'>followers</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (


                        <tr key={user._id}>
                            <td>
                                <Link to={`/userlist/${user._id}`}>
                                    {user.username}
                                </Link>
                                {followed = user.followers.includes(userUser.id)}
                                {newFollow = follow.includes(user._id)}
                            </td>
                            
                            <td>{user.admin ? 'Admin' : 'User'}</td>

                            <td className='followers-nu'>
                                {newFollow
                                    ? followed
                                        ? user.followers.length - 1
                                        : user.followers.length + 1
                                        : user.followers.length}
                            </td>

                            <td>
                                
                                <button onClick={() => toggleFollow(user._id)}>
                                {
                        (!followed && newFollow) || (followed && !newFollow)
                          ? "unfollow"
                          : "follow"
                      }
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
