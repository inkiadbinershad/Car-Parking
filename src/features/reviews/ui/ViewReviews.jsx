import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost';
const getJson = async (url) => { const r = await fetch(url); if (!r.ok) throw new Error(r.status); return r.json(); };

export default function ViewReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getJson(`${API_BASE}/get_reviews.php`);
        if (!cancelled) setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError('Failed to load reviews');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="container">
      <h2 className="gradient-title">All Reviews</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <div className="cards-grid section">
          {reviews.length === 0 && (
            <div className="card-3d tilt"><div className="tilt-inner">No reviews yet.</div></div>
          )}
          {reviews.map((r, i) => (
            <div className="card-3d tilt" key={r.id || i}><div className="tilt-inner">
              <div style={{ fontWeight: 700 }}>Rating: {r.rating}</div>
              <div className="subtle">{r.feedback || r.comment || ''}</div>
            </div></div>
          ))}
        </div>
      )}
    </div>
  );
}
