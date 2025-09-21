import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RATE_PER_HOUR = 1000; // Taka

function diffHours(startISO, endISO) {
  const s = new Date(startISO).getTime();
  const e = new Date(endISO).getTime();
  if (isNaN(s) || isNaN(e) || e <= s) return 0;
  const ms = e - s;
  return Math.ceil(ms / (1000 * 60 * 60)); // round up to next hour
}

export default function BookingDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const query = new URLSearchParams(window.location.search);
  const spotFromQuery = query.get('spotId') ? { id: Number(query.get('spotId')), name: `#${query.get('spotId')}` } : null;
  const spot = state?.spot || spotFromQuery;

  const [start, setStart] = useState(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    return new Date(now.getTime() + 60*60*1000).toISOString().slice(0,16); // default +1 hour
  });
  const [end, setEnd] = useState(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    return new Date(now.getTime() + 2*60*60*1000).toISOString().slice(0,16); // default +2 hours
  });

  const hours = useMemo(() => diffHours(start, end), [start, end]);
  const cost = useMemo(() => hours * RATE_PER_HOUR, [hours]);

  const onProceed = () => {
    // Build bill payload and navigate to payment
    const bill = {
      spotId: spot?.id ?? null,
      spotName: spot?.name ?? 'N/A',
      start,
      end,
      hours,
      rate: RATE_PER_HOUR,
      total: cost,
    };
    navigate('/payment', { state: { bill } });
  };

  if (!spot) {
    return (
      <div className="container">
        <div className="error">No spot selected. Go back to booking.</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="gradient-title">Booking details for spot {spot.name}</h2>
      <div className="cards-grid section">
        <div className="card-3d tilt"><div className="tilt-inner">
          <h3>When would you like to park?</h3>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <label>Start date & time
              <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} required />
            </label>
            <label>End date & time
              <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} required />
            </label>
            <div className="info">Rate: {RATE_PER_HOUR.toLocaleString()} Taka/hour</div>
          </form>
        </div></div>
        <div className="card-3d tilt"><div className="tilt-inner">
          <h3>Summary</h3>
          <ul className="list">
            <li><strong>Spot:</strong> {spot.name}</li>
            <li><strong>Start:</strong> {new Date(start).toLocaleString()}</li>
            <li><strong>End:</strong> {new Date(end).toLocaleString()}</li>
            <li><strong>Hours:</strong> {hours}</li>
            <li><strong>Rate:</strong> {RATE_PER_HOUR.toLocaleString()} Taka/hour</li>
            <li><strong>Total:</strong> {cost.toLocaleString()} Taka</li>
          </ul>
          <button onClick={onProceed} disabled={hours <= 0}>Proceed to Pay</button>
        </div></div>
      </div>
    </div>
  );
}
