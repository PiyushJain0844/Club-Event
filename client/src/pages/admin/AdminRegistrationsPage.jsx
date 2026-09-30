import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Trash2, Mail, Phone, GraduationCap, Calendar, Download } from 'lucide-react';
import api from '../../services/api';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Modal from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';

const AdminRegistrationsPage = () => {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const [registrations, setRegistrations] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(searchParams.get('eventId') || 'all');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEventsList();
    fetchRegistrations();
  }, [selectedEventId, searchTerm]);

  const fetchEventsList = async () => {
    try {
      const res = await api.get('/events?dateFilter=all');
      setEventsList(res.data.events || []);
    } catch (err) {
      console.error('Failed to load events list:', err);
    }
  };

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedEventId && selectedEventId !== 'all') {
        params.eventId = selectedEventId;
      }
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      const res = await api.get('/registrations', { params });
      setRegistrations(res.data.registrations || []);
    } catch (err) {
      console.error('Failed to load registrations:', err);
      showToast('Failed to load registration records.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDeleteModal = (reg) => {
    setRegistrationToDelete(reg);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!registrationToDelete) return;
    try {
      setDeleting(true);
      await api.delete(`/registrations/${registrationToDelete._id}`);
      showToast('Registration record deleted.', 'success');
      setRegistrations((prev) => prev.filter((r) => r._id !== registrationToDelete._id));
      setDeleteModalOpen(false);
    } catch (err) {
      console.error('Error deleting registration:', err);
      showToast(err.response?.data?.message || 'Failed to delete registration.', 'error');
    } finally {
      setDeleting(false);
      setRegistrationToDelete(null);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: '2rem', backgroundColor: 'var(--bg-main)', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>Student Registrations</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>View and manage student event sign-ups.</p>
          </div>
        </div>

        {/* Search & Event Filter */}
        <div
          className="glass-card"
          style={{
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 280px',
            gap: '1rem'
          }}
          className="search-filter-grid"
        >
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search by student name, email, college, or event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.8rem',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {/* Filter by Event Dropdown */}
          <div>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
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
              <option value="all">All Events (Filter)</option>
              {eventsList.map((evt) => (
                <option key={evt._id} value={evt._id}>
                  {evt.title} ({evt.registeredCount || 0}/{evt.capacity})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Registrations Table Container */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Showing <strong style={{ color: '#fff' }}>{registrations.length}</strong> registration records
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading student records...</div>
          ) : registrations.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No student registrations found.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Student Name</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Email</th>
                    <th style={{ padding: '0.85rem 1rem' }}>College & Year</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Phone</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Registered Event</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Registration Date</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: '600', color: '#fff' }}>
                        {reg.name}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                        {reg.email}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                        <div style={{ color: '#fff' }}>{reg.college}</div>
                        <div style={{ fontSize: '0.775rem' }}>{reg.year}</div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                        {reg.phone}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: '#a5b4fc', fontWeight: '600' }}>
                        {reg.eventId?.title || 'Event Removed'}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        {new Date(reg.registeredAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleOpenDeleteModal(reg)}
                          className="btn btn-danger btn-sm"
                          title="Delete Registration"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Registration Record"
        message={`Are you sure you want to delete registration record for student "${registrationToDelete?.name}"?`}
        confirmText="Delete Registration"
        confirmVariant="danger"
        loading={deleting}
      />

      <style>{`
        @media (max-width: 768px) {
          .search-filter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminRegistrationsPage;
