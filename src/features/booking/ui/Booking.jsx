import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost';
const getJson = async (url) => { const r = await fetch(url); if (!r.ok) throw new Error(r.status); return r.json(); };

export default function Booking({ user }) {
  const [spots, setSpots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getJson(`${API_BASE}/get_spots.php`);
        if (!cancelled) setSpots(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setSpots([
          { id: 1, name: 'A1', available: true },
          { id: 2, name: 'A2', available: false },
          { id: 3, name: 'B1', available: true },
          { id: 4, name: 'B2', available: true },
          { id: 5, name: 'C1', available: false },
          { id: 6, name: 'C2', available: true },
        ]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const onBook = (spot) => {
    // Navigate to booking details page with spot info and query param fallback
    navigate(`/booking/details?spotId=${spot.id}`, { state: { spot } });
  };

  return (
    <div className="container">
      <h2 className="gradient-title">Book a Parking Spot</h2>
      <p className="subtle">Choose from the available spots below.</p>
      <div className="cards-grid section">
        {spots.map((s) => (
          <div className="card-3d tilt" key={s.id}><div className="tilt-inner">
            <img
              src={`https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=800&auto=format&fit=crop&ixid=${s.id}`}
              alt={`Spot ${s.name}`}
              style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700 }}>Spot {s.name}</div>
                <div className="subtle">{s.available ? 'Available' : 'Occupied'}</div>
              </div>
              <button onClick={() => onBook(s)} disabled={!s.available}>
                {s.available ? 'Book' : 'Unavailable'}
              </button>
            </div>
          </div></div>
        ))}
      </div>
    </div>
  );
}
