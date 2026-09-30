import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, Globe, Share2, MessageCircle, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: '4rem',
        paddingBottom: '2rem',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Brand Column */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--primary-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <Sparkles size={18} />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: '800' }}>
                Campus<span className="gradient-text">Connect</span>
              </span>
            </Link>
            <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
              "Connect. Create. Celebrate."
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              The official centralized event platform for college student clubs, hackathons, workshops, and cultural celebrations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link to="/" style={{ color: 'var(--text-muted)', transition: 'var(--transition)' }}>Home</Link>
              </li>
              <li>
                <Link to="/events" style={{ color: 'var(--text-muted)', transition: 'var(--transition)' }}>Explore Events</Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-muted)', transition: 'var(--transition)' }}>About CampusConnect</Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--text-muted)', transition: 'var(--transition)' }}>Contact Us</Link>
              </li>
              <li>
                <Link to="/admin/login" style={{ color: 'var(--text-muted)', transition: 'var(--transition)' }}>Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff' }}>Categories</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link to="/events?category=Technical" style={{ color: 'var(--text-muted)' }}>Technical & Coding</Link></li>
              <li><Link to="/events?category=Cultural" style={{ color: 'var(--text-muted)' }}>Cultural & Music</Link></li>
              <li><Link to="/events?category=Competition" style={{ color: 'var(--text-muted)' }}>Hackathons & Contests</Link></li>
              <li><Link to="/events?category=Workshop" style={{ color: 'var(--text-muted)' }}>Hands-on Workshops</Link></li>
              <li><Link to="/events?category=Sports" style={{ color: 'var(--text-muted)' }}>Sports & Tournaments</Link></li>
            </ul>
          </div>

          {/* Contact Info & Socials */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', color: '#fff' }}>Contact & Connect</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="var(--primary)" />
                <span>events@campusconnect.edu</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="var(--primary)" />
                <span>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={16} color="var(--primary)" />
                <span>Student Activity Center, Main Campus</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[Globe, Share2, MessageCircle, ExternalLink].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#social"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    transition: 'var(--transition)'
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.875rem',
            color: 'var(--text-muted)'
          }}
        >
          <p>© {new Date().getFullYear()} CampusConnect. All rights reserved. Designed for College Recruitment & Event Management.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/privacy" onClick={(e) => e.preventDefault()} style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link>
            <Link to="/terms" onClick={(e) => e.preventDefault()} style={{ color: 'var(--text-muted)' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
