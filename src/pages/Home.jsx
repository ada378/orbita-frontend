import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import HeroCarousel from '../components/HeroCarousel';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'New York, USA',
    text: 'Tripmate saved me hours of planning. I uploaded my flight and hotel bookings, and got a complete day-by-day itinerary. Absolutely brilliant!',
    rating: 5
  },
  {
    name: 'Rahul Sharma',
    location: 'Mumbai, India',
    text: 'The AI-generated itinerary was incredibly accurate. It even suggested restaurants near my hotel that I would never have found on my own.',
    rating: 5
  },
  {
    name: 'Emma Williams',
    location: 'London, UK',
    text: 'I love how I can share the itinerary with my travel group. Everyone stays on the same page. Made our family trip so much smoother.',
    rating: 5
  }
];

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="home-page">
      <section className="hero">
        <HeroCarousel />
        <div className="hero-content">
          <h1>Your trips,<br/><span>intelligently planned</span></h1>
          <p className="hero-subtitle">
            Upload your travel bookings and let AI create a perfect day-by-day itinerary for you
          </p>
          {user ? (
            <div className="hero-actions">
              <Link to="/upload" className="btn btn-primary btn-lg">Upload Bookings</Link>
              <Link to="/dashboard" className="btn btn-outline btn-lg">My Trips</Link>
            </div>
          ) : (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
              <Link to="/login" className="btn btn-outline btn-lg">Sign In</Link>
            </div>
          )}
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>10K+</h3>
            <p>Itineraries Generated</p>
          </div>
          <div className="stat-item">
            <h3>5K+</h3>
            <p>Happy Travelers</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Countries Covered</p>
          </div>
          <div className="stat-item">
            <h3>4.9</h3>
            <p>User Rating</p>
          </div>
        </div>
      </section>

      <section className="why-section">
        <h2>Why Tripmate?</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">B</div>
            <h3>No More Spreadsheets</h3>
            <p>Stop juggling between booking confirmations, maps, and notes. Upload everything once and get a unified itinerary.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">A</div>
            <h3>AI-Powered Planning</h3>
            <p>Our AI understands your bookings and intelligently schedules activities, meals, and rest times for each day of your trip.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">S</div>
            <h3>Share Instantly</h3>
            <p>Generate a shareable link for your itinerary. Travel companions can view the plan without creating an account.</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">1</div>
            <h3>Upload Documents</h3>
            <p>Upload flight tickets, hotel bookings, or any travel documents</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">2</div>
            <h3>AI Processing</h3>
            <p>Our AI extracts and analyzes your booking information</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">3</div>
            <h3>Get Itinerary</h3>
            <p>Receive a structured day-by-day travel itinerary</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">4</div>
            <h3>Share with Others</h3>
            <p>Share your itinerary with travel companions via a link</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Travelers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <FaStar key={j} />
                ))}
              </div>
              <p>"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to plan your next trip?</h2>
          <p>Upload your bookings and let AI create your perfect itinerary in seconds. Join thousands of happy travelers.</p>
          {user ? (
            <div className="hero-actions">
              <Link to="/upload" className="btn btn-primary btn-lg">Upload Bookings</Link>
              <Link to="/dashboard" className="btn btn-outline btn-lg">My Trips</Link>
            </div>
          ) : (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
              <Link to="/login" className="btn btn-outline btn-lg">Sign In</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
