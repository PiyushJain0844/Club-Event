import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { User, Mail, GraduationCap, Phone, CheckCircle2, ArrowLeft, AlertCircle, Sparkles, Calendar, MapPin } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { EventDetailsSkeleton } from '../components/common/SkeletonLoader';

const EventRegistrationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    year: 'B.Tech CSE 3rd Year',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoadingEvent(true);
      const res = await api.get(`/events/${id}`);
      setEvent(res.data.event);
      if (res.data.event?.isFull) {
        setServerError('Registration for this event is full.');
      }
    } catch (err) {
      console.error('Error fetching event for registration:', err);
      setServerError('Event not found or failed to load.');
    } finally {
      setLoadingEvent(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    setServerError(null);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter a valid email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address';
      }
    }

    if (!formData.college.trim()) {
      errs.college = 'College name is required';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else {
      // Indian phone number validation (10 digits, optionally starting with +91 or 0)
      const phoneClean = formData.phone.trim().replace(/[\s\-()]/g, '');
      const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
      if (!phoneRegex.test(phoneClean)) {
        errs.phone = 'Please enter a valid 10-digit Indian phone number';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      setServerError(null);

      const payload = {
        eventId: id,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        college: formData.college.trim(),
        year: formData.year.trim(),
        phone: formData.phone.trim()
      };

      const res = await api.post('/registrations', payload);

      setSuccess(true);
      showToast('Registration successful! We look forward to seeing you.', 'success');
    } catch (err) {
      console.error('Registration failed:', err);
      const msg = err.response?.data?.message || 'Something went wrong during registration.';
      setServerError(msg);
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingEvent) return <EventDetailsSkeleton />;

  if (success) {
    return (
      <div className="container section animate-fade-in" style={{ maxWidth: '600px', margin: '4rem auto 0 auto' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'rgba(5, 150, 105, 0.2)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <CheckCircle2 size={42} />
          </div>

          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>Registration Successful!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Registration successful! We look forward to seeing you at <strong>{event?.title}</strong>.
          </p>

          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.7)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '2rem',
              textAlign: 'left',
              fontSize: '0.9rem',
              color: 'var(--text-muted)'
            }}
          >
            <div style={{ marginBottom: '0.4rem', color: '#fff', fontWeight: '600' }}>Registration Details:</div>
            <div>Name: <span style={{ color: '#fff' }}>{formData.name}</span></div>
            <div>Email: <span style={{ color: '#fff' }}>{formData.email}</span></div>
            <div>Event Date: <span style={{ color: '#fff' }}>{new Date(event?.date).toLocaleDateString()}</span></div>
            <div>Venue: <span style={{ color: '#fff' }}>{event?.venue}</span></div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/events" className="btn btn-primary btn-lg">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container section animate-fade-in" style={{ maxWidth: '720px', paddingTop: '2.5rem' }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} /> Back to Event
      </button>

      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <div style={{ marginBottom: '1.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>
            Event Registration Form
          </span>
          <h1 style={{ fontSize: '1.8rem', marginTop: '0.25rem', color: '#fff' }}>
            Register for {event?.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.35rem' }}>
            {new Date(event?.date).toLocaleDateString()} • {event?.startTime} • {event?.venue}
          </p>
        </div>

        {serverError && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}
          >
            <AlertCircle size={20} className="shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
              Full Name *
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aarav Sharma"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.8rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: errors.name ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
          </div>

          {/* Email Address */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
              Email Address *
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. aarav.sharma@college.edu"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.8rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: errors.email ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
          </div>

          {/* College / Institute & Year */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                College Name *
              </label>
              <div style={{ position: 'relative' }}>
                <GraduationCap size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="e.g. National Institute of Tech"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.8rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    border: errors.college ? '1px solid #ef4444' : '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
              {errors.college && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.college}</span>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Branch / Year *
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g. B.Tech CSE 3rd Year"
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

          {/* Phone Number */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
              Phone Number *
            </label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.8rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: errors.phone ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '1rem' }}>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={submitting || event?.isFull}
            >
              {submitting ? 'Submitting Registration...' : 'Complete Registration'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default EventRegistrationPage;
