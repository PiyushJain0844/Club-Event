import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Calendar, AlertCircle } from 'lucide-react';
import api from '../services/api';
import EventCard from '../components/events/EventCard';
import { EventCardSkeleton } from '../components/common/SkeletonLoader';

const CATEGORIES = [
  'All Categories',
  'Technical',
  'Cultural',
  'Sports',
  'Workshop',
  'Competition',
  'Entrepreneurship',
  'Social',
  'Other'
];

const EventsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state initialized from searchParams or defaults
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Categories');
  const [dateFilter, setDateFilter] = useState(searchParams.get('dateFilter') || 'upcoming');

  useEffect(() => {
    fetchEvents();
  }, [searchTerm, selectedCategory, dateFilter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (selectedCategory && selectedCategory !== 'All Categories') params.category = selectedCategory;
      if (dateFilter && dateFilter !== 'all') params.dateFilter = dateFilter;

      const res = await api.get('/events', { params });
      setEvents(res.data.events || []);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <div className="events-page container section animate-fade-in" style={{ paddingTop: '3rem' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
          Explore <span className="gradient-text">Campus Events</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Browse all upcoming workshops, technical hackathons, cultural fests, and sports tournaments.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}
      >
        {/* Search Bar & Date Filter */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '1rem' }} className="search-row">
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search events by name, description, venue or organizer..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.8rem',
                backgroundColor: 'rgba(15, 23, 42, 0.7)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Date Status Dropdown */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
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
              <option value="upcoming">Upcoming Events</option>
              <option value="past">Past Events</option>
              <option value="all">All Dates</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={14} /> Filter by Category:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`btn btn-sm ${active ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.825rem',
                    padding: '0.35rem 0.9rem'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events Grid / Loading / Empty */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </div>
      ) : events.length === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '50%' }}>
            <AlertCircle size={40} />
          </div>
          <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>No events found</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '420px' }}>
            No events found matching your search term or selected category filters. Try resetting your search parameters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All Categories');
              setDateFilter('all');
            }}
            className="btn btn-secondary btn-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Showing <strong style={{ color: '#fff' }}>{events.length}</strong> {events.length === 1 ? 'event' : 'events'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 640px) {
          .search-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default EventsPage;
