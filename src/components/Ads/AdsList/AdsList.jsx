import React from 'react';
import AdService from '../services/AdService';

const AdList = ({ ads, onDelete }) => {
  const handleDelete = async (adId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ad?');
    if (!confirmDelete) return;

    try {
      await AdService.deleteAd(adId);
      onDelete(adId);
    } catch (error) {
      console.error('Error deleting ad:', error);
      alert('Failed to delete the ad. Please try again later.');
    }
  };

  return (
    <div className="ad-list">
      {ads.map((ad) => (
        <div className="ad-card" key={ad._id}>
          <h3>{ad.title}</h3>
          <p>{ad.description}</p>
          <img src={ad.image} alt={ad.title} className="ad-image" />
          <button onClick={() => handleDelete(ad._id)} className="delete-btn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdList;
