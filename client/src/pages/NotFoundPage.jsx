import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div
      className="container section animate-fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65vh',
        textAlign: 'center'
      }}
    >
      <div className="glass-card" style={{ padding: '3.5rem 2.5rem', maxWidth: '520px', width: '100%' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}
        >
          <AlertTriangle size={36} />
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem', color: '#fff' }}>
          404 — Page Not Found
        </h1>

        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
          The page you are trying to reach does not exist, has been moved, or the URL address was mistyped.
        </p>

        <Link to="/" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
          <Home size={18} />
          Return to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
