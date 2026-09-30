import React from 'react';

export const EventCardSkeleton = () => {
  return (
    <div className="glass-card" style={{ padding: 0 }}>
      <div className="skeleton" style={{ height: '200px', width: '100%' }}></div>
      <div style={{ padding: '1.5rem' }}>
        <div className="skeleton" style={{ height: '20px', width: '30%', marginBottom: '1rem' }}></div>
        <div className="skeleton" style={{ height: '24px', width: '80%', marginBottom: '1rem' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '60%', marginBottom: '0.5rem' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '50%', marginBottom: '1.5rem' }}></div>
        <div className="skeleton" style={{ height: '40px', width: '100%' }}></div>
      </div>
    </div>
  );
};

export const EventDetailsSkeleton = () => {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div className="skeleton" style={{ height: '360px', width: '100%', borderRadius: '20px', marginBottom: '2rem' }}></div>
      <div className="skeleton" style={{ height: '32px', width: '50%', marginBottom: '1rem' }}></div>
      <div className="skeleton" style={{ height: '20px', width: '25%', marginBottom: '2rem' }}></div>
      <div className="skeleton" style={{ height: '100px', width: '100%', marginBottom: '2rem' }}></div>
    </div>
  );
};
