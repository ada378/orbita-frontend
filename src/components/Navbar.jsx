import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand" onClick={closeMenu}>
          <img src="/aerplane.jpg" className="brand-logo" alt="Tripmate" />
          Tripmate
        </Link>
        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span><span></span><span></span>
        </button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link" onClick={closeMenu}>My Trips</Link>
              <Link to="/upload" className="nav-link" onClick={closeMenu}>Upload</Link>
              <span className="nav-user">{user.name}</span>
              <button onClick={() => { handleLogout(); closeMenu(); }} className="btn btn-sm btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={closeMenu}>Sign In</Link>
              <Link to="/register" className="btn btn-sm btn-primary" onClick={closeMenu}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
