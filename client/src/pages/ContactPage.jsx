import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ContactPage = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required contact fields.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Thank you for reaching out! We will reply within 24 hours.', 'success');
    }, 600);
  };

  return (
    <div className="contact-page container section animate-fade-in" style={{ paddingTop: '3rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
          <Sparkles size={14} /> Get In Touch
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>
          Contact <span className="gradient-text">CampusConnect</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto', fontSize: '1.05rem' }}>
          Have questions regarding an upcoming event, partnership, or club registration? Send us a message below.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '2.5rem' }} className="contact-grid">
        {/* Contact Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '12px' }}>
              <Mail size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Club Email</span>
              <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.95rem' }}>events@campusconnect.edu</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '12px' }}>
              <Phone size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Helpline Phone</span>
              <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.95rem' }}>+91 98765 43210</div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '12px' }}>
              <MapPin size={22} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Office Address</span>
              <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.95rem' }}>
                Student Activity Center, Room 204 <br /> Main College Campus
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
            <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.5rem' }}>Organizing a New Event?</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              If you represent an officially recognized student club, contact admin to request event hosting permissions.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(5, 150, 105, 0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>Message Sent Successfully!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Thank you for contacting CampusConnect. We will get back to your email shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>Send Us a Message</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.35rem' }}>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: '#fff',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.35rem' }}>Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@example.com"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: '#fff',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.35rem' }}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Query regarding CodeFest 2026 eligibility"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.35rem' }}>Message *</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your query or message details..."
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ marginTop: '0.5rem' }}>
                {loading ? 'Sending Message...' : 'Send Message'}
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
