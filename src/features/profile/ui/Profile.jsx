import React, { useEffect, useState } from 'react';

export default function Profile({ user }) {
  const [bookings, setBookings] = useState([]);
  const displayName = user?.username || 'Guest';
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=2563eb&color=fff&size=256`;

  useEffect(() => {
    setBookings([
      { id: 101, spot: 'A1', date: '2025-01-15' },
      { id: 102, spot: 'B2', date: '2025-02-03' },
      { id: 103, spot: 'C2', date: '2025-02-16' },
    ]);
  }, []);

  return (
    <div className="container">
      <div className="section cards-grid">
        <div className="card-3d tilt"><div className="tilt-inner" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'center' }}>
          <img src={avatar} alt="Avatar" style={{ width: 88, height: 88, borderRadius: '50%', border: '2px solid rgba(255,255,255,.25)' }} />
          <div>
            <h2 style={{ margin: 0 }}>Profile</h2>
            <div className="subtle">Username: {displayName}</div>
          </div>
        </div></div>
        <div className="card-3d tilt"><div className="tilt-inner">
          <h3>Membership</h3>
          <p className="subtle">Standard</p>
          <p className="subtle">Renewal: 2026-01-01</p>
        </div></div>
        <div className="card-3d tilt"><div className="tilt-inner">
          <h3>Statistics</h3>
          <p className="subtle">Total Bookings: {bookings.length}</p>
          <p className="subtle">Favorite Spot: B2</p>
        </div></div>
      </div>

      <div className="section">
        <h3>Recent Bookings</h3>
        <div className="cards-grid">
          {bookings.map((b) => (
            <div className="card-3d tilt" key={b.id}><div className="tilt-inner">
              <div style={{ fontWeight: 700 }}>#{b.id}</div>
              <div className="subtle">Spot {b.spot}</div>
              <div className="subtle">Date {b.date}</div>
            </div></div>
          ))}
        </div>
      </div>
    </div>
  );
}
