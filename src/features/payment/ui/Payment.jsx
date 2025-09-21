import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const API_BASE = 'http://localhost';
const postForm = async (url, data) => {
  const body = new URLSearchParams(data).toString();
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  try { return await res.json(); } catch { return await res.text(); }
};

export default function Payment() {
  const { state } = useLocation();
  const bill = state?.bill;
  const [amount, setAmount] = useState(bill?.total ? String(bill.total) : '');
  const [card, setCard] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const formatCard = (v) => v.replace(/[^0-9]/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!amount || !card) {
      setMessage('Amount and card number are required.');
      return;
    }
    setLoading(true);
    try {
      const resp = await postForm(`${API_BASE}/process_payment.php`, { amount, card: card.replace(/\s+/g, '') });
      if (typeof resp === 'object' && resp?.success) {
        setMessage('Payment processed successfully.');
        setAmount(''); setCard(''); setName(''); setExpiry('');
      } else {
        setMessage(typeof resp === 'string' ? resp : 'Payment failed.');
      }
    } catch (err) {
      setMessage(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="card-3d tilt"><div className="tilt-inner" style={{ display: 'grid', placeItems: 'center', minHeight: 260 }}>
          <div className="credit-card">
            <div className="chip" />
            <div className="row">
              <div className="meta">CARD HOLDER</div>
              <div className="meta">VALID THRU</div>
            </div>
            <div className="row" style={{ marginTop: 6 }}>
              <div className="meta" style={{ fontWeight: 700 }}>{name || 'YOUR NAME'}</div>
              <div className="meta">{expiry || 'MM/YY'}</div>
            </div>
            <div className="num" style={{ marginTop: 16 }}>{formatCard(card) || '0000 0000 0000 0000'}</div>
          </div>
        </div></div>
        <div className="card-3d tilt"><div className="tilt-inner">
          <h2>Payment</h2>
          {bill && (
            <div className="card" style={{ marginBottom: 12 }}>
              <h3 style={{ marginTop: 0 }}>Bill Summary</h3>
              <ul className="list">
                <li><strong>Spot:</strong> {bill.spotName}</li>
                <li><strong>Start:</strong> {new Date(bill.start).toLocaleString()}</li>
                <li><strong>End:</strong> {new Date(bill.end).toLocaleString()}</li>
                <li><strong>Hours:</strong> {bill.hours}</li>
                <li><strong>Rate:</strong> {bill.rate.toLocaleString()} Taka/hour</li>
                <li><strong>Total:</strong> {bill.total.toLocaleString()} Taka</li>
              </ul>
            </div>
          )}
          <form onSubmit={onSubmit} className="form">
            <label>Amount<input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" step="0.01" required /></label>
            <label>Card Number<input value={card} onChange={(e) => setCard(formatCard(e.target.value))} placeholder="4111 1111 1111 1111" required /></label>
            <label>Name on Card<input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" /></label>
            <label>Expiry (MM/YY)<input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="08/28" /></label>
            {message && <div className="info">{message}</div>}
            <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Pay'}</button>
          </form>
        </div></div>
      </div>
    </div>
  );
}
