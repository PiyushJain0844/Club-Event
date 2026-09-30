import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, ShieldCheck, Users, Trophy, Rocket, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="about-page container section animate-fade-in" style={{ paddingTop: '3rem' }}>
      {/* Hero Intro */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div
          className="badge"
          style={{
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            color: 'var(--primary)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            padding: '0.4rem 1rem',
            marginBottom: '1.25rem'
          }}
        >
          <Sparkles size={14} /> About CampusConnect
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '1rem' }}>
          Empowering College Communities Through <br />
          <span className="gradient-text">Seamless Event Experiences</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto', lineHeight: '1.7' }}>
          CampusConnect is a modern, unified event management platform designed specifically for college clubs, technical societies, and student activity councils.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="glass-card" style={{ padding: '3rem', marginBottom: '4rem', background: 'radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.15) 0%, rgba(30, 41, 59, 0.7) 60%)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="about-grid">
          <div>
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Target size={26} />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>Our Core Mission</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
              To transform how college events are discovered, promoted, and managed. We eliminate outdated paper forms and scattered messaging groups by providing a centralized hub where students can easily register and club leads can oversee attendance in real-time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Users size={32} color="var(--primary)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>100%</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Student Engagement</p>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <Trophy size={32} color="var(--accent)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>50+</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>College Contests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits for Students vs Clubs */}
      <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>Built For Both Sides</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }} className="benefits-grid">
        {/* For Students */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Rocket size={24} color="var(--primary)" />
            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>For Students</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.975rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <ShieldCheck size={18} color="var(--primary)" className="shrink-0" style={{ marginTop: '2px' }} />
              <span>Explore all upcoming technical hackathons, cultural battles, and sports events in one place.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <ShieldCheck size={18} color="var(--primary)" className="shrink-0" style={{ marginTop: '2px' }} />
              <span>One-click registration with instant verification & duplicate prevention.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <ShieldCheck size={18} color="var(--primary)" className="shrink-0" style={{ marginTop: '2px' }} />
              <span>Filter events by domain interest, date, or category to never miss an opportunity.</span>
            </li>
          </ul>
        </div>

        {/* For Clubs & Organizers */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Users size={24} color="var(--secondary)" />
            <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>For Clubs & Organizers</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.975rem' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <ShieldCheck size={18} color="var(--secondary)" className="shrink-0" style={{ marginTop: '2px' }} />
              <span>Dedicated Admin Dashboard to post, edit, and manage event listings.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <ShieldCheck size={18} color="var(--secondary)" className="shrink-0" style={{ marginTop: '2px' }} />
              <span>Live capacity enforcement preventing overbooking for limited-seat workshops.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <ShieldCheck size={18} color="var(--secondary)" className="shrink-0" style={{ marginTop: '2px' }} />
              <span>Instant access to registered student lists with search and export capabilities.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="glass-card"
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#fff' }}>Ready to Get Started?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
          Explore current events happening across campus or register your college club today.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/events" className="btn btn-primary btn-lg">
            Browse Events <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid, .benefits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
