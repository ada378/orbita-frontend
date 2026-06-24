import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { itineraryAPI } from '../utils/api';
import ItineraryCard from '../components/ItineraryCard';

export default function Dashboard() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadItineraries(); }, []);

  const loadItineraries = async () => {
    try {
      const res = await itineraryAPI.getAll();
      setItineraries(res.data);
    } catch (err) { console.error('Failed to load itineraries:', err);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this itinerary?')) return;
    try {
      await itineraryAPI.delete(id);
      setItineraries(itineraries.filter(i => i._id !== id));
    } catch (err) { console.error('Delete failed:', err); }
  };

  if (loading) return <div className="page-container"><div className="loading">Loading your trips...</div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Trips</h1>
        <Link to="/upload" className="btn btn-primary">+ New Trip</Link>
      </div>
      {itineraries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">0</div>
          <h3>No trips yet</h3>
          <p>Upload your travel bookings to generate your first AI itinerary</p>
          <Link to="/upload" className="btn btn-primary">Upload Bookings</Link>
        </div>
      ) : (
        <div className="itinerary-grid">
          {itineraries.map(itinerary => (
            <ItineraryCard key={itinerary._id} itinerary={itinerary} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
