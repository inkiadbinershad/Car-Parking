import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// Feature modules
import { Home } from './features/home';
import { Review } from './features/review';
import { ViewReviews } from './features/reviews';
import { Booking } from './features/booking';
import BookingDetails from './features/booking/ui/BookingDetails';
import { Profile } from './features/profile';
import { Payment } from './features/payment';

// Protected route wrapper (disabled for now)
const ProtectedRoute = ({ authed, children }) => children;

// Navigation
const NavBar = () => (
  <nav className="nav">
    <div className="nav-left">
      <Link to="/" className="brand">Parking App</Link>
    </div>
    <div className="nav-right">
      <Link to="/">Home</Link>
      <Link to="/review">Review</Link>
      <Link to="/reviews">View Reviews</Link>
      <Link to="/booking">Booking</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/payment">Payment</Link>
    </div>
  </nav>
);

function App() {
  const [user] = useState(null);
  const authed = useMemo(() => true, []);
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-blob" style={{ left: '6%', top: '6%' }} />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review" element={<Review />} />
        <Route path="/reviews" element={<ViewReviews />} />
        <Route path="/booking" element={<ProtectedRoute authed={authed}><Booking user={user} /></ProtectedRoute>} />
        <Route path="/booking/details" element={<ProtectedRoute authed={authed}><BookingDetails /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute authed={authed}><Profile user={user} /></ProtectedRoute>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
