import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Image, Users, Star, ArrowLeft } from 'lucide-react';

const CATEGORIES = [
  'Technical',
  'Cultural',
  'Sports',
  'Workshop',
  'Competition',
  'Entrepreneurship',
  'Social',
  'Other'
];

const EventForm = ({ initialData, onSubmit, isEditing = false, loading = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical',
    date: '',
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    venue: '',
    image: '',
    organizer: '',
    capacity: 100,
    featured: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // Format date to YYYY-MM-DD for standard html date input
      let formattedDate = '';
      if (initialData.date) {
        const d = new Date(initialData.date);
        formattedDate = d.toISOString().split('T')[0];
      }

      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Technical',
        date: formattedDate,
        startTime: initialData.startTime || '10:00 AM',
        endTime: initialData.endTime || '04:00 PM',
        venue: initialData.venue || '',
        image: initialData.image || '',
        organizer: initialData.organizer || '',
        capacity: initialData.capacity || 100,
        featured: Boolean(initialData.featured)
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Event title is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.date) errs.date = 'Date is required';
    if (!formData.startTime.trim()) errs.startTime = 'Start time is required';
    if (!formData.endTime.trim()) errs.endTime = 'End time is required';
    if (!formData.venue.trim()) errs.venue = 'Venue location is required';
    if (!formData.capacity || Number(formData.capacity) < 1) errs.capacity = 'Capacity must be at least 1';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          {isEditing ? 'Edit Event Details' : 'Create New Event'}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
              Event Name *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Hackathon 2026: Code for Impact"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: errors.title ? '1px solid #ef4444' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: '0.95rem'
              }}
            />
            {errors.title && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.title}</span>}
          </div>

          {/* Category & Date Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Event Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: errors.date ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              />
              {errors.date && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.date}</span>}
            </div>
          </div>

          {/* Start Time & End Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Start Time *
              </label>
              <input
                type="text"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                placeholder="e.g. 10:00 AM"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: errors.startTime ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              />
              {errors.startTime && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.startTime}</span>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                End Time *
              </label>
              <input
                type="text"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                placeholder="e.g. 05:00 PM"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: errors.endTime ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              />
              {errors.endTime && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.endTime}</span>}
            </div>
          </div>

          {/* Venue */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
              Venue Location *
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="e.g. Main Auditorium, CS Block B"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: errors.venue ? '1px solid #ef4444' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: '0.95rem'
              }}
            />
            {errors.venue && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.venue}</span>}
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
              Full Event Description *
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event goals, schedule, eligibility, and rules..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: errors.description ? '1px solid #ef4444' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: '0.95rem',
                resize: 'vertical'
              }}
            />
            {errors.description && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.description}</span>}
          </div>

          {/* Image URL & Organizer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Banner Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
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
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Organizer / Club Name
              </label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                placeholder="e.g. Coding Society"
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

          {/* Capacity & Featured Checkbox */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                Student Capacity *
              </label>
              <input
                type="number"
                name="capacity"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: errors.capacity ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              />
              {errors.capacity && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{errors.capacity}</span>}
            </div>

            <div style={{ paddingTop: '1.25rem' }}>
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={16} fill={formData.featured ? '#f59e0b' : 'none'} color="#f59e0b" />
                  Set as Featured Event
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/admin/events')}
              disabled={loading}
            >
              <ArrowLeft size={16} /> Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Saving Event...' : isEditing ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
