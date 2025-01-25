import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AdService from '../../../services/AdsService';
import ConfirmDeleteModal from '../ConfirmDelete/ConfirmDeleteModal';
import './UpcomingAds.css';

const UpcomingAds = ({ user }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adIdToDelete, setAdIdToDelete] = useState(null);

  // Fetch ads on component mount
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await AdService.getAds();
        setAds(data);
      } catch (err) {
        setError('Failed to fetch ads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Handle delete confirmation
  const handleDelete = async () => {
    if (adIdToDelete) {
      try {
        await AdService.deleteAd(adIdToDelete);
        setAds((prevAds) => prevAds.filter((ad) => ad._id !== adIdToDelete));
        closeModal();
      } catch (error) {
        console.error('Error deleting ad:', error);
        setError('Failed to delete ad. Please try again later.');
      }
    }
  };

  // Open modal to confirm delete
  const openModal = (adId) => {
    setAdIdToDelete(adId);
    setIsModalOpen(true);
  };

  // Close the confirmation modal
  const closeModal = () => {
    setIsModalOpen(false);
    setAdIdToDelete(null);
  };

  if (loading) {
    return <p>Loading ads...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="ads-container">
      <h1 className="ads-h1">Upcoming Ads</h1>
      <div className="ad-cards">
        {ads.map((ad) => (
          <div className="ad-card" key={ad._id}>
            <img src={ad.image} alt={ad.title} className="ad-image" />
            <div className="ad-details">
              <h2 className="ad-title">{ad.title}</h2>
              <p className="ad-description">{ad.description}</p>
              {user?.admin && (
                <div className="ad-actions">
                  <Link to={`/edit-Ads/${ad._id}`} className="edit-button">
                    Edit
                  </Link>
                  <button className="delete-button" onClick={() => openModal(ad._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onConfirm={handleDelete}
        onCancel={closeModal}
        message="Are you sure you want to delete this ad?"
      />
    </div>
  );
};

export default UpcomingAds;
