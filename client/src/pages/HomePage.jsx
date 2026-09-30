import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Sparkles, Users, Award, Zap, ArrowRight, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import EventCard from '../components/events/EventCard';
import { EventCardSkeleton } from '../components/common/SkeletonLoader';

const HomePage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        // Fetch upcoming events from backend
        const res = await api.get('/events?dateFilter=upcoming');
        const all = res.data.events || [];
        
        // Pick featured event or first event
        const feat = all.find((e) => e.featured) || all[0] || null;
        setFeaturedEvent(feat);
        
        // Show first 6 events
        setUpcomingEvents(all.slice(0, 6));
      } catch (err) {
        console.error('Error loading homepage events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const featureCards = [
    {
      icon: '🎯',
      title: 'Discover Events',
      description: 'Find hackathons, coding contests, music battles, sports meets, and expert workshops across all departments.'
    },
    {
      icon: '🤝',
      title: 'Connect with Students',
      description: 'Collaborate with like-minded peers, form competition teams, and broaden your student network.'
    },
    {
      icon: '🚀',
      title: 'Build Experiences',
      description: 'Gain hands-on practical exposure outside lecture halls and enhance your career resume.'
    },
    {
      icon: '🏆',
      title: 'Showcase Your Skills',
      description: 'Compete on campus stages, win exciting rewards, certificates, and college glory.'
    }
  ];

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '6rem 0 4rem 0',
          background: 'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div
              className="badge"
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: 'var(--primary)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                padding: '0.4rem 1rem',
                fontSize: '0.85rem',
                marginBottom: '1.5rem'
              }}
            >
              <Sparkles size={14} /> Official Campus Event Portal
            </div>

            <h1
              style={{
                fontSize: '3.2rem',
                fontWeight: '800',
                letterSpacing: '-1px',
                lineHeight: '1.15',
                marginBottom: '1.25rem'
              }}
            >
              Discover. Participate. <br />
              <span className="gradient-text">Make Memories.</span>
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
                marginBottom: '2rem',
                maxWidth: '540px'
              }}
            >
              Explore exciting college events, workshops, competitions and activities happening around campus. Your one-stop destination for club recruitment and event registrations.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/events" className="btn btn-primary btn-lg">
                <Calendar size={20} />
                Explore Events
              </Link>
              <Link to="/events" className="btn btn-secondary btn-lg">
                Register for Events
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Hero Visual Banner */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100%',
                height: '100%',
                background: 'var(--primary-gradient)',
                borderRadius: 'var(--radius-lg)',
                filter: 'blur(30px)',
                opacity: 0.3,
                zIndex: 0
              }}
            />
            <div
              className="glass-card"
              style={{
                position: 'relative',
                zIndex: 1,
                padding: '0.75rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80"
                alt="College Event Banner"
                style={{
                  width: '100%',
                  height: '340px',
                  objectFit: 'cover',
                  borderRadius: 'calc(var(--radius-lg) - 4px)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700' }}>
                    🔥 Live Campus Event
                  </span>
                  <h4 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>CodeFest & Tech Summit 2026</h4>
                </div>
                <Link to="/events" className="btn btn-primary btn-sm">Join Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About CampusConnect Intro */}
      <section className="section" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <h2 className="section-title">About CampusConnect</h2>
          <p className="section-subtitle">
            CampusConnect bridges the gap between student talent and campus activities. We empower students to register effortlessly and help club organizers manage seamless event experiences.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {featureCards.map((feat, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2rem', textAlign: 'left' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feat.icon}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', color: '#fff' }}>{feat.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.6' }}>{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event Spotlight */}
      {featuredEvent && (
        <section className="section" style={{ backgroundColor: 'rgba(30, 41, 59, 0.4)', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <div
              className="glass-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2.5rem',
                padding: '2.5rem',
                alignItems: 'center',
                boxShadow: 'var(--shadow-glow)'
              }}
            >
              <div style={{ height: '320px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Star size={14} fill="#fff" /> FEATURED EVENT
                  </span>
                  <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem' }}>{featuredEvent.category}</span>
                </div>

                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>{featuredEvent.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  {featuredEvent.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>Date & Time</strong>
                    {new Date(featuredEvent.date).toLocaleDateString()} at {featuredEvent.startTime}
                  </div>
                  <div>
                    <strong style={{ color: '#fff', display: 'block' }}>Venue</strong>
                    {featuredEvent.venue}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to={`/events/${featuredEvent._id}/register`} className="btn btn-primary btn-lg">
                    Register Now
                  </Link>
                  <Link to={`/events/${featuredEvent._id}`} className="btn btn-secondary btn-lg">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Grid */}
      <section className="section" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Upcoming Campus Events</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.35rem' }}>Don't miss out on the latest tech hackathons, workshops & cultural fests.</p>
            </div>
            <Link to="/events" className="btn btn-outline">
              View All Events
              <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No upcoming events scheduled at the moment. Check back soon!
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {upcomingEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Campus Statistics Counter */}
      <section className="section" style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center'
            }}
          >
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 className="gradient-text" style={{ fontSize: '3rem', fontWeight: '800' }}>50+</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.5rem' }}>Events Organized</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 className="gradient-text" style={{ fontSize: '3rem', fontWeight: '800' }}>1000+</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.5rem' }}>Student Registrations</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 className="gradient-text" style={{ fontSize: '3rem', fontWeight: '800' }}>20+</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.5rem' }}>Active College Clubs</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 className="gradient-text" style={{ fontSize: '3rem', fontWeight: '800' }}>25+</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginTop: '0.5rem' }}>Skill Workshops</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
