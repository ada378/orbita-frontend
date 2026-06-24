import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { itineraryAPI } from '../utils/api';

export default function ItineraryDetail() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadItinerary(); }, [id]);

  const loadItinerary = async () => {
    try {
      const res = await itineraryAPI.get(id);
      setItinerary(res.data);
    } catch (err) { console.error('Failed to load itinerary:', err);
    } finally { setLoading(false); }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/shared/${itinerary.shareId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  if (loading) return <div className="page-container"><div className="loading">Loading itinerary...</div></div>;
  if (!itinerary) return (
    <div className="page-container">
      <div className="empty-state"><h3>Itinerary not found</h3><Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link></div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="itinerary-header">
        <div>
          <Link to="/dashboard" className="back-link">Back to Trips</Link>
          <h1>{itinerary.title}</h1>
          {itinerary.destination && <p className="itinerary-destination">{itinerary.destination}</p>}
        </div>
        <div className="itinerary-actions">
          <button className="btn btn-outline" onClick={handleCopyLink}>Share</button>
        </div>
      </div>
      <div className="itinerary-meta">
        {itinerary.startDate && <span>{itinerary.startDate} - {itinerary.endDate || 'N/A'}</span>}
        {itinerary.upload?.originalName && <span>{itinerary.upload.originalName}</span>}
      </div>
      {itinerary.summary && <div className="itinerary-summary"><p>{itinerary.summary}</p></div>}
      <div className="itinerary-days">
        {itinerary.days.map((day, index) => (
          <div key={index} className="day-card">
            <div className="day-header">
              <h3>Day {day.day || index + 1}</h3>
              {day.date && <span className="day-date">{day.date}</span>}
            </div>
            <div className="day-section">
              <h4>Activities</h4>
              <ul>{day.activities.map((activity, i) => <li key={i}>{activity}</li>)}</ul>
            </div>
            {day.meals && day.meals.length > 0 && (
              <div className="day-section">
                <h4>Meals</h4>
                <ul>{day.meals.map((meal, i) => <li key={i}>{meal}</li>)}</ul>
              </div>
            )}
            {day.accommodation && (
              <div className="day-section">
                <h4>Accommodation</h4>
                <p>{day.accommodation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
