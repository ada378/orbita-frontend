import React from 'react';
import { Link } from 'react-router-dom';

export default function ItineraryCard({ itinerary, onDelete }) {
  const dayCount = itinerary.days?.length || 0;
  const date = new Date(itinerary.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <div className="itinerary-card">
      <div className="card-body">
        <h3>{itinerary.title}</h3>
        {itinerary.destination && (
          <p className="card-destination">{itinerary.destination}</p>
        )}
        <div className="card-meta">
          <span>{dayCount} {dayCount === 1 ? 'day' : 'days'}</span>
          <span>{date}</span>
        </div>
        {itinerary.summary && (
          <p className="card-summary">{itinerary.summary.slice(0, 120)}...</p>
        )}
      </div>
      <div className="card-actions">
        <Link to={`/itinerary/${itinerary._id}`} className="btn btn-sm btn-primary">View</Link>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(itinerary._id)}>Delete</button>
      </div>
    </div>
  );
}
