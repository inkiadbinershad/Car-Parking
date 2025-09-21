import React, { useState } from 'react';

const API_BASE = 'http://localhost';

const postForm = async (url, data) => {
  const body = new URLSearchParams(data).toString();
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  try { return await res.json(); } catch { return await res.text(); }
};

export default function Review() {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!feedback || !rating) {
      setMessage('Please provide feedback and rating.');
      return;
    }
    setLoading(true);
    try {
      const resp = await postForm(`${API_BASE}/review.php`, { feedback, rating });
      if (typeof resp === 'object' && resp?.success) {
        setMessage('Thanks for your review!');
        setFeedback('');
        setRating('');
      } else {
        setMessage(typeof resp === 'string' ? resp : 'Failed to submit review.');
      }
    } catch (err) {
      setMessage(err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="section">
        <div className="card-3d tilt"><div className="tilt-inner">
          <h2>Submit a Review</h2>
          <form onSubmit={onSubmit} className="form">
            <label>
              Feedback
              <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
            </label>
            <label>
              Rating
              <select value={rating} onChange={(e) => setRating(e.target.value)} required>
                <option value="">Select</option>
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            {message && <div className="info">{message}</div>}
            <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Review'}</button>
          </form>
        </div></div>
      </div>
    </div>
  );
}
