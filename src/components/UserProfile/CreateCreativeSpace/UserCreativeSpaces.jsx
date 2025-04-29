import { useEffect, useState } from 'react';
import creativeSpaceServices from '../../../services/creativeSpaceServices';
import './UserCreativeSpaces.css';

const UserCreativeSpaces = ({ userId }) => {
  const [creativeSpaces, setCreativeSpaces] = useState([]);
  const [error, setError] = useState(null);

  const fetchSpaces = async () => {
    try {
      const spaces = await creativeSpaceServices.getUserCreativeSpaces(userId);
      setCreativeSpaces(spaces);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (userId) fetchSpaces();
  }, [userId]);

  const handleDelete = async (spaceId) => {
    if (confirm('Are you sure you want to delete this space?')) {
      try {
        await creativeSpaceServices.deleteCreativeSpace(spaceId);
        setCreativeSpaces(prev => prev.filter(space => space._id !== spaceId));
      } catch (err) {
        alert('Failed to delete space: ' + err.message);
      }
    }
  };

  const handleUpdate = (spaceId) => {
    // This could route to an edit page or open a modal
    alert(`Update function for space ID: ${spaceId} (implement modal or route)`);
  };

  if (error) return <p className="ucs-error">Error: {error}</p>;

  return (
    <div className="ucs-container">
      <h2 className="ucs-title">My Creative Spaces</h2>
      {creativeSpaces.length === 0 ? (
        <p className="ucs-empty">No creative spaces found.</p>
      ) : (
        <div className="ucs-list">
          {creativeSpaces.map((space) => (
            <div key={space._id} className="ucs-card">
              <p className="ucs-p">Title</p>
              <h3 className="ucs-card-title">{space.title}</h3>

              <p className="ucs-p">Description</p>
              <p className="ucs-card-desc">{space.description}</p>

              <p className="ucs-p">Image</p>
              {space.image && (
                <img
                  src={space.image}
                  alt={space.title}
                  className="ucs-card-image"
                />
              )}

              {space.link && (
                <a
                  href={space.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ucs-card-link"
                >
                  Visit Link
                </a>
              )}

              <div className="ucs-buttons">
                <button onClick={() => handleUpdate(space._id)} className="btn-update">Update</button>
                <button onClick={() => handleDelete(space._id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCreativeSpaces;
