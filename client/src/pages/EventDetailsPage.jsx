import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft, ArrowRight, ShieldCheck, UserCheck, Share2 } from 'lucide-react';
import api from '../services/api';
import Badge from '../components/common/Badge';
import { EventDetailsSkeleton } from '../components/common/SkeletonLoader';
import { useToast } from '../context/ToastContext';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/events/${id}`);
      setEvent(res.data.event);
    } catch (err) {
      console.error('Failed to load event details:', err);
      setError(err.response?.data?.message || 'Event not found or invalid URL.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event URL copied to clipboard!', 'info');
    }
  };

  if (loading) return <EventDetailsSkeleton />;

  if (error || !event) {
    return (
      <div className="container section text-center animate-fade-in" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>Event Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error || 'The event you are looking for does not exist or has been removed.'}</p>
        <Link to="/events" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Events
        </Link>
      </div>
    );
  }

  const {
    title,
    description,
    category,
    date,
    startTime,
    endTime,
    venue,
    image,
    organizer = 'CampusConnect Team',
    capacity = 100,
    registeredCount = 0,
    isFull = false
  } = event;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const percentage = Math.min(Math.round((registeredCount / capacity) * 100), 100);

  return (
    <div className="event-details-page container section animate-fade-in" style={{ paddingTop: '2rem' }}>
      {/* Back Button & Share */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary btn-sm">
          <ArrowLeft size={16} /> Back
        </button>

        <button onClick={handleShare} className="btn btn-secondary btn-sm">
          <Share2 size={16} /> Share Event
        </button>
      </div>

      {/* Main Banner Image */}
      <div
        style={{
          position: 'relative',
          height: '400px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <img
          src={image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)',
            padding: '2.5rem 2rem 1.5rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <Badge category={category} />
            <h1 style={{ fontSize: '2.4rem', marginTop: '0.5rem', color: '#fff', lineHeight: '1.2' }}>{title}</h1>
          </div>
        </div>
      </div>

      {/* Main Grid: Details Left, Sidebar Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2.5rem' }} className="details-grid">
        {/* Left Column: Event Overview & Description */}
        <div>
          {/* Key Info Cards Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '12px' }}>
                  <Calendar size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Date</span>
                  <div style={{ fontWeight: '600', color: '#fff', fontSize: '0.95rem' }}>{formattedDate}</div>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '12px' }}>
                  <Clock size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Time</span>
                  <div style={{ fontWeight: '600', color: '#fff', fontSize: '0.95rem' }}>{startTime} - {endTime}</div>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', padding: '0.6rem', borderRadius: '12px' }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Venue</span>
                  <div style={{ fontWeight: '600', color: '#fff', fontSize: '0.95rem' }}>{venue}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#fff', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              About This Event
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: 'pre-line' }}>
              {description}
            </p>
          </div>

          {/* Organizer Info */}
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: '700'
              }}
            >
              <UserCheck size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Organized By</span>
              <h4 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>{organizer}</h4>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Registration Card */}
        <div>
          <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#fff' }}>Registration Summary</h3>

            {/* Capacity Progress */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={16} /> Seats Allocated
                </span>
                <span style={{ fontWeight: '700', color: isFull ? '#ef4444' : '#34d399' }}>
                  {registeredCount} / {capacity}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: isFull ? '#ef4444' : 'var(--primary-gradient)',
                    borderRadius: '999px',
                    transition: 'width 0.5s ease'
                  }}
                />
              </div>
            </div>

            {/* Registration Status Badge */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isFull ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                border: isFull ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                color: isFull ? '#f87171' : '#34d399',
                fontSize: '0.9rem',
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}
            >
              {isFull ? '🔴 Registration Full' : '🟢 Open for Registration'}
            </div>

            {/* Register CTA */}
            {isFull ? (
              <button className="btn btn-secondary" disabled style={{ width: '100%', padding: '0.9rem' }}>
                Seats Filled
              </button>
            ) : (
              <Link to={`/events/${_id}/register`} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Register Now
                <ArrowRight size={18} />
              </Link>
            )}

            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="var(--primary)" /> Instant registration confirmation
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="var(--primary)" /> Open to all college students
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default EventDetailsPage;
