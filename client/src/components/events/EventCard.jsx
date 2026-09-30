import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, Star } from 'lucide-react';
import Badge from '../common/Badge';

const EventCard = ({ event }) => {
  const {
    _id,
    title,
    description,
    category,
    date,
    startTime,
    venue,
    image,
    capacity = 100,
    registeredCount = 0,
    isFull = false,
    featured = false
  } = event;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const percentage = Math.min(Math.round((registeredCount / capacity) * 100), 100);

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      {/* Event Image */}
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
        <img
          src={image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            gap: '6px'
          }}
        >
          <Badge category={category} />
        </div>

        {featured && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            <Star size={12} fill="#fff" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            fontSize: '1.25rem',
            marginBottom: '0.75rem',
            lineHeight: '1.3',
            color: '#ffffff'
          }}
        >
          {title}
        </h3>

        {/* Date, Time & Venue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={15} color="var(--primary)" />
            <span>{formattedDate}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={15} color="var(--primary)" />
            <span>{startTime}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={15} color="var(--primary)" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{venue}</span>
          </div>
        </div>

        {/* Short Description */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: '1.5',
            marginBottom: '1.25rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {description}
        </p>

        {/* Capacity Meter */}
        <div style={{ marginTop: 'auto', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Users size={14} /> Capacity
            </span>
            <span style={{ fontWeight: '600', color: isFull ? '#ef4444' : 'var(--text-main)' }}>
              {isFull ? 'Registration Full' : `${registeredCount} / ${capacity} Registered`}
            </span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${percentage}%`,
                background: isFull
                  ? '#ef4444'
                  : percentage > 85
                  ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                  : 'var(--primary-gradient)',
                borderRadius: '999px',
                transition: 'width 0.5s ease'
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <Link to={`/events/${_id}`} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            Details
          </Link>
          {isFull ? (
            <button className="btn btn-secondary btn-sm" disabled style={{ width: '100%', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              Full
            </button>
          ) : (
            <Link to={`/events/${_id}/register`} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              Register
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
