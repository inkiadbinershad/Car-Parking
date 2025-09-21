import React from 'react';
import { Link } from 'react-router-dom';

const HERO_IMG = 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1400&auto=format&fit=crop';

export default function Home() {
  return (
    <div className="container">
      <div className="hero section">
        <div className="panel">
          <h1 className="gradient-title">Smart Parking, Simple Experience</h1>
          <p className="subtle" style={{ marginTop: 10 }}>
            Find and book available parking spots, manage your profile, submit reviews, and make secure payments.
            A modern UI with animated gradients, glass panels, and interactive 3D touches.
          </p>
          <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/booking"><button>Get Started</button></Link>
            <Link to="/reviews"><button style={{ background: 'linear-gradient(180deg,#8b5cf6,#7c3aed)', borderColor: 'rgba(139,92,246,.45)' }}>See Reviews</button></Link>
          </div>
        </div>
        <img src={HERO_IMG} alt="Parking lot" />
      </div>
    </div>
  );
}
