import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'var(--primary)', description }) => {
  return (
    <div
      className="glass-card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}
    >
      <div>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: '500' }}>
          {title}
        </span>
        <h3 style={{ fontSize: '2rem', fontWeight: '800', marginTop: '0.25rem', color: '#ffffff' }}>
          {value}
        </h3>
        {description && (
          <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {description}
          </p>
        )}
      </div>

      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '16px',
          backgroundColor: `rgba(99, 102, 241, 0.12)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
          border: `1px solid ${color}33`,
          flexShrink: 0
        }}
      >
        <Icon size={26} />
      </div>
    </div>
  );
};

export default StatCard;
