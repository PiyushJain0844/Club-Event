import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Users, Search, Star, ExternalLink, Calendar } from 'lucide-react';
import api from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

const AdminEventsPage = () => {
  const { showToast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/events?dateFilter=all');
      setEvents(res.data.events || []);
    } catch (err) {
      console.error('Failed to load events:', err);
      showToast('Failed to load event list.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedEventId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEventId) return;
    try {
      setDeleting(true);
      await api.delete(`/events/${selectedEventId}`);
      showToast('Event deleted successfully.', 'success');
      setEvents((prev) => prev.filter((e) => e._id !== selectedEventId));
      setDeleteModalOpen(false);
    } catch (err) {
      console.error('Failed to delete event:', err);
      showToast(err.response?.data?.message || 'Failed to delete event.', 'error');
    } finally {
      setDeleting(false);
      setSelectedEventId(null);
    }
  };

  const filteredEvents = events.filter((e) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      e.title?.toLowerCase().includes(term) ||
      e.category?.toLowerCase().includes(term) ||
      e.venue?.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--bg-main)', overflowY: 'auto' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>Manage Events</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Create, update, or remove campus events.</p>
          </div>

          <Link to="/admin/events/add" className="btn btn-primary">
            <Plus size={18} /> Add New Event
          </Link>
        </div>

        {/* Filter / Search Bar */}
        <div className="glass-card" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search by event title, category, or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Events Table Container */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading events...</div>
          ) : filteredEvents.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No events found matching your criteria.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Event</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Date & Venue</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Capacity & Registered</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Featured</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((evt) => (
                    <tr key={evt._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      {/* Event Banner & Title */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={evt.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=100&q=80'}
                            alt=""
                            style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=100&q=80'; }}
                          />
                          <div>
                            <div style={{ fontWeight: '700', color: '#fff' }}>{evt.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{evt.organizer}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <Badge category={evt.category} />
                      </td>

                      {/* Date & Venue */}
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                        <div style={{ color: '#fff', fontWeight: '500' }}>{new Date(evt.date).toLocaleDateString()}</div>
                        <div style={{ fontSize: '0.8rem' }}>{evt.venue}</div>
                      </td>

                      {/* Capacity & Registered */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{ fontWeight: '600', color: evt.isFull ? '#ef4444' : '#34d399' }}>
                          Registered: {evt.registeredCount || 0} / {evt.capacity}
                        </span>
                        {evt.isFull && <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>Full</div>}
                      </td>

                      {/* Featured */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        {evt.featured ? (
                          <span style={{ color: '#f59e0b', fontWeight: '600', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={14} fill="#f59e0b" /> Yes
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No</span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <Link
                            to={`/admin/registrations?eventId=${evt._id}`}
                            className="btn btn-secondary btn-sm"
                            title="View Registrations"
                          >
                            <Users size={14} />
                          </Link>
                          <Link
                            to={`/events/${evt._id}`}
                            target="_blank"
                            className="btn btn-secondary btn-sm"
                            title="Preview Public Page"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <Link
                            to={`/admin/events/edit/${evt._id}`}
                            className="btn btn-secondary btn-sm"
                            title="Edit Event"
                          >
                            <Edit size={14} />
                          </Link>
                          <button
                            onClick={() => handleOpenDeleteModal(evt._id)}
                            className="btn btn-danger btn-sm"
                            title="Delete Event"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Modal for Delete */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Event Confirmation"
        message="Are you sure you want to delete this event? This will also remove all student registration records associated with this event. This action cannot be undone."
        confirmText="Delete Event"
        confirmVariant="danger"
        loading={deleting}
      />
    </div>
  );
};

export default AdminEventsPage;
